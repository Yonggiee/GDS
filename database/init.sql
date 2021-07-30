DROP TABLE IF EXISTS url_mapping CASCADE;

CREATE TABLE url_mapping (
    url_from VARCHAR(255) PRIMARY KEY,
    url_to VARCHAR(255) NOT NULL UNIQUE,
    last_accessed TIMESTAMP NOT NULL default CURRENT_TIMESTAMP
);

DROP FUNCTION IF EXISTS insertUrlMapping;
CREATE OR REPLACE FUNCTION insertUrlMapping(val_url_from VARCHAR, val_url_to VARCHAR)
RETURNS TABLE (result VARCHAR)
LANGUAGE plpgsql
AS
$$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM url_mapping WHERE url_from=val_url_from) THEN
        INSERT INTO url_mapping VALUES (val_url_from, val_url_to);
    END IF;
	RETURN query SELECT val_url_to as url_to;
END;
$$;
