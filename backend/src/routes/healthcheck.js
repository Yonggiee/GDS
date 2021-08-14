const express = require('express');
const HttpStatusCodes = require('../utils/HttpStatusCodes');

const healthCheckRouter = express.Router();

healthCheckRouter.get('/', async (req, res) => {
    return res.status(HttpStatusCodes.OK).json({ message: 'Server is healthy.' });
});

module.exports = healthCheckRouter;
