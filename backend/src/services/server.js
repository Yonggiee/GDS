const express = require("express");
const cors = require("cors");

// Import routers
const healthCheckRouter = require("../routes/healthcheck");
const shortenRouter = require("../routes/shorten");

const router = express.Router();
// Define routes
router.use("/healthcheck", healthCheckRouter);
router.use("/shorten", shortenRouter);

const app = express();
app
  .use(express.json())
  .use(cors())
  .use(express.urlencoded({ extended: false }))
  .use("/api", router);

module.exports = app;
