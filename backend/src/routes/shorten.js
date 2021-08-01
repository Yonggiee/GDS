const express = require('express');
const HttpStatusCodes = require('../utils/HttpStatusCodes')
const { pool } = require('../services/db');
const shorten = require('../services/shorten')
const { SHORTYURL } = require('../utils/constants');

const shortenRouter = express.Router();

shortenRouter.get('/', async (req, res) => {
    const base62Encoded = req.query.url;

    if (!base62Encoded.includes(SHORTYURL)) {
        return res.status(HttpStatusCodes.BAD_REQUEST).json({ //
            err: 'Not a shorty URL.'
        });
    }

    try {
        const { rows } = await pool.query(
            'SELECT selectUrlMapping($1) as url_from;',
            [ base62Encoded ]
        );
        if(rows.length == 0) {
            return res.status(HttpStatusCodes.NOT_FOUND).json({
                err: 'No URL found!'
            });
        }
        return res.status(200).json(rows[0]);
    } catch (err) {
        console.log(err)
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json();
    }
});

shortenRouter.post('/', async (req, res) => {
    const originalUrl = req.query.url;

    if (originalUrl.includes(SHORTYURL)) {
        return res.status(HttpStatusCodes.BAD_REQUEST)
            .json({
                err: 'This is already a shorty URL!'
            });
    }

    const base62Encoded = shorten(originalUrl);
    const newMapping = SHORTYURL + base62Encoded; 
    try {
        const { rows } = await pool.query(
            'SELECT insertUrlMapping($1, $2) as url_to;',
            [originalUrl, newMapping]
        );
        return res.status(HttpStatusCodes.OK)
                .json(rows[0]);
    } catch (err) {
        console.log(err)
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json();
    }
});

module.exports = shortenRouter
