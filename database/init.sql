DROP TABLE IF EXISTS url_mapping CASCADE;

CREATE TABLE url_mapping (
    id INTEGER PRIMARY KEY,
    url_from VARCHAR(255) NOT NULL UNIQUE,
    url_to VARCHAR(255) NOT NULL,
    last_accessed TIMESTAMP NOT NULL default CURRENT_TIMESTAMP
);

DROP FUNCTION IF EXISTS selectUrlMapping;
CREATE OR REPLACE FUNCTION selectUrlMapping(val_url_to VARCHAR)
RETURNS VARCHAR(25)
LANGUAGE plpgsql
AS
$$
DECLARE
    ret_url VARCHAR(255);

BEGIN
    SELECT url_from INTO ret_url
        FROM url_mapping
    WHERE url_to = val_url_to;
    IF ret_url IS NOT NULL THEN
        UPDATE url_mapping
            SET last_accessed = NOW()
        WHERE url_to = val_url_to;
    END IF;
	RETURN ret_url;
END;
$$;
