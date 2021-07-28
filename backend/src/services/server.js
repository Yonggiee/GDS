const express = require('express');
const cors = require('cors');

// Import routers
const healthCheckRouter = require('../routes/healthcheck');

const router = express.Router();
// Define routes
router.use("/api/healthcheck", healthCheckRouter)

const app = express();
app.use(express.json())
    .use(cors())
    .use(express.urlencoded({extended: false}))
    .use(router)

module.exports = app
    