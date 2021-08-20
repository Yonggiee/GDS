const express = require('express');
const HTTP_STATUS_CODES = require('../utils/httpStatusCodes');

const healthCheckRouter = express.Router();

healthCheckRouter.get('/', async (req, res) => {
    return res.status(HTTP_STATUS_CODES.OK).json({ message: 'Server is healthy.' });
});

module.exports = healthCheckRouter;
