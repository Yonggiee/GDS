DROP TABLE IF EXISTS url_mapping CASCADE;

CREATE TABLE url_mapping (
    id INTEGER PRIMARY KEY,
    url_from VARCHAR(255) NOT NULL UNIQUE,
    url_to VARCHAR(255) NOT NULL,
    last_accessed TIMESTAMP NOT NULL default CURRENT_TIMESTAMP
);

DROP FUNCTION IF EXISTS selectUrlMapping;
CREATE OR REPLACE FUNCTION selectUrlMapping(val_url_to VARCHAR)
RETURNS TABLE (result VARCHAR)
LANGUAGE plpgsql
AS
$$
BEGIN
    IF EXISTS (SELECT 1 FROM url_mapping WHERE url_to=val_url_to) THEN
        UPDATE url_mapping
            SET last_accessed = NOW()
        WHERE url_to = val_url_to;
    END IF;
	RETURN query
        SELECT url_from 
            FROM url_mapping
        WHERE url_to = val_url_to;
END;
$$;

DROP FUNCTION IF EXISTS insertUrlMapping;
CREATE OR REPLACE FUNCTION insertUrlMapping(val_url_from VARCHAR)
RETURNS TABLE (result VARCHAR)
LANGUAGE plpgsql
AS
$$
DECLARE lowest_id INTEGER;

BEGIN
    IF NOT EXISTS (SELECT 1 FROM url_mapping WHERE url_from=val_url_from) THEN
        SELECT inc.n INTO lowest_id
            FROM generate_series(1, (SELECT COALESCE(MAX(id), 0) FROM url_mapping) + 1) AS inc(n) 
        WHERE inc.n NOT IN (SELECT id FROM url_mapping);

        INSERT INTO url_mapping VALUES (lowest_id, val_url_from, 'Creating URL...');
        RETURN query 
            SELECT CAST(lowest_id AS VARCHAR);
    ELSE
        UPDATE url_mapping
            SET last_accessed = NOW()
        WHERE url_from = val_url_from;
        RETURN query
            SELECT url_to 
                FROM url_mapping
            WHERE url_from = val_url_from;
    END IF;
END;
$$;
