const express = require('express');
const { json, response } = require('express');

const healthCheckRouter = express.Router();

healthCheckRouter.get('/', async (req, res) => {
    return res.status(200).json({ message: "Server is healthy." });
});

module.exports = {
    healthCheckRouter
}
