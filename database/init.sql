DROP TABLE IF EXISTS url_mapping CASCADE;

CREATE TABLE url_mapping (
    id INTEGER NOT NULL UNIQUE,
    original_url VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY,
    shorten_tag VARCHAR(20) NOT NULL UNIQUE,
    last_accessed TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

DROP FUNCTION IF EXISTS selectUrlMapping;
CREATE OR REPLACE FUNCTION selectUrlMapping(val_shorten_tag VARCHAR)
RETURNS VARCHAR(25)
LANGUAGE plpgsql
AS
$$
DECLARE
    url VARCHAR(255);

BEGIN
    SELECT original_url INTO url
        FROM url_mapping
    WHERE shorten_tag = val_shorten_tag;
    IF url IS NOT NULL THEN
        UPDATE url_mapping
            SET last_accessed = NOW()
        WHERE shorten_tag = val_shorten_tag;
    END IF;
	RETURN url;
END;
$$;
