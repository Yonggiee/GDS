const express = require('express');
const cors = require('cors');

const router = express.Router();

// Import routers
const { healthCheckRouter } = require('./routes/healthcheck.js');

// Define routes
router.use("/api/healthcheck", healthCheckRouter)

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json())
    .use(cors())
    .use(express.urlencoded({extended: false}))
    .use(router)
    .listen(PORT, () => console.log(`Running server on ${PORT}`));
