const express = require('express');
const { pool } = require('../services/db')
const HTTP_STATUS_CODES = require('../utils/httpStatusCodes');

const healthCheckRouter = express.Router();

healthCheckRouter.get('/', async (req, res) => {
    try {
        const client = await pool.connect();
        client.release();
        return res.status(HTTP_STATUS_CODES.OK).json({ message: 'Server is healthy.' });
    } catch(err) {
        return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ err: 'Server is not healthy.' });
    }
});

module.exports = healthCheckRouter;
