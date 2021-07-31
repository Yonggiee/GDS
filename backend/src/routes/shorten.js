const express = require('express');
const HttpStatusCodes = require('../utils/HttpStatusCodes')
const { pool } = require('../services/db');
const shorten = require('../services/shorten')

const shortenRouter = express.Router();

shortenRouter.get('/', async (req, res) => {
    const base62Encoded = req.query.url;
    try {
        const { rows } = await pool.query(
            "SELECT url_from FROM url_mapping WHERE url_to = $1;",
            [ base62Encoded ]
        );
        if(rows.length == 0) {
            return res.status(HttpStatusCodes.NOT_FOUND).json();
        }
        return res.status(200).json(rows[0]);
    } catch (err) {
        console.log(err)
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json();
    }
});

shortenRouter.post('/', async (req, res) => {
    const originalUrl = req.query.url;
    const base62Encoded = shorten(originalUrl);
    try {
        const { rows } = await pool.query(
            "SELECT insertUrlMapping($1, $2) as url_to;",
            [originalUrl, base62Encoded]
        );
        return res.status(HttpStatusCodes.OK)
                .json(rows[0]);
    } catch (err) {
        console.log(err)
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json();
    }
});

module.exports = shortenRouter
