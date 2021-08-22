const express = require('express');
const { pool } = require('../services/db');
const HTTP_STATUS_CODES = require('../utils/httpStatusCodes');
const shorten = require('../utils/shorten');
const { SHORTY_URL } = require('../utils/constants');

const shortenRouter = express.Router();

shortenRouter.get('/', async (req, res) => {
    const base62Encoded = req.query.url;

    if (!base62Encoded.includes(SHORTY_URL)) {
        return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({
            err: 'Not a shorty URL.'
        });
    }

    try {
        const { rows } = await pool.query(
            'SELECT selectUrlMapping($1) as url_from;',
            [ base62Encoded ]
        );
        const row = rows[0];
        if(row['url_from'] == null) {
            return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
                err: 'No URL found!'
            });
        }
        return res.status(200).json(row);
    } catch (err) {
        console.log(err);
        return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json();
    }
});

shortenRouter.post('/', async (req, res) => {
    const originalUrl = req.query.url;

    if (originalUrl.includes(SHORTY_URL)) {
        return res.status(HTTP_STATUS_CODES.BAD_REQUEST)
            .json({
                err: 'This is already a shorty URL!'
            });
    }

    const client = await pool.connect();
    for (let i = 0; i < 5; i++) {
        try {
            await client.query('BEGIN');
            const { rows } = await pool.query(
                'SELECT url_to \
                    FROM url_mapping \
                WHERE url_from = $1',
                [originalUrl]
            );
            
            if (rows.length > 0) {
                client.release();
                return res.status(HTTP_STATUS_CODES.OK)
                    .json(rows[0]);
            } 

            const result = await pool.query(
                'SELECT inc.n as lowest_id\
                    FROM generate_series(1, (SELECT COALESCE(MAX(id), 0) FROM url_mapping) + 1) AS inc(n) \
                WHERE inc.n NOT IN (SELECT id FROM url_mapping);'
            );
            const lowestId = result['rows'][0]['lowest_id'];  
            
            const newMapping = shorten(lowestId);
            await client.query(
                'INSERT INTO url_mapping (id, url_from, url_to) VALUES ($1, $2, $3);',
                [lowestId, originalUrl, newMapping]
            );
            await client.query('COMMIT');
            client.release();
    
            return res.status(HTTP_STATUS_CODES.OK)
                .json({
                    url_to: newMapping
                });
        } catch (err) {
            console.log(err);
            await client.query('ROLLBACK');
        }
    }

    client.release();
    return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json();
});

module.exports = shortenRouter;
