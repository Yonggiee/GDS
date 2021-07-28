const express = require('express');
const cors = require('cors');

// Import routers
const healthCheckRouter = require('../routes/healthcheck');
const shortenerRouter = require('../routes/shortener')

const router = express.Router();
// Define routes
router.use("/healthcheck", healthCheckRouter)
router.use("/shortener", shortenerRouter )

const app = express();
app.use(express.json())
    .use(cors())
    .use(express.urlencoded({extended: false}))
    .use("/api", router)

module.exports = app
    