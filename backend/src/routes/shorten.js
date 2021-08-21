const express = require('express');
const { pool } = require('../services/db');
const HTTP_STATUS_CODES = require('../utils/httpStatusCodes')
const shorten = require('../utils/shorten')
const { SHORTY_URL } = require('../utils/constants');

const shortenRouter = express.Router();

shortenRouter.get('/', async (req, res) => {
    const base62Encoded = req.query.url;

    if (!base62Encoded.includes(SHORTY_URL)) {
        return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ //
            err: 'Not a shorty URL.'
        });
    }

    try {
        const { rows } = await pool.query(
            'SELECT selectUrlMapping($1) as url_from;',
            [ base62Encoded ]
        );
        if(rows.length == 0) {
            return res.status(HTTP_STATUS_CODES.NOT_FOUND).json({
                err: 'No URL found!'
            });
        }
        return res.status(200).json(rows[0]);
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

    try {
        const { rows } = await pool.query(
            'SELECT insertUrlMapping($1) as url_to;',
            [originalUrl]
        );
        if (!isNaN(rows[0]['url_to'])) {
            const id = rows[0]['url_to'];
            const newMapping = shorten(id);
            await pool.query(
                'UPDATE url_mapping \
                    SET url_to = $1  \
                WHERE id = $2;',
                [newMapping, id]
            );
            return res.status(HTTP_STATUS_CODES.OK)
                .json({
                    url_to: newMapping
                });
        }
        return res.status(HTTP_STATUS_CODES.OK)
                .json(rows[0]);
    } catch (err) {
        console.log(err);
        return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json();
    }
});

module.exports = shortenRouter;
