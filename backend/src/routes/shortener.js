const express = require('express');
const { pool } = require('../services/db');

const shortenerRouter = express.Router();

shortenerRouter.post('/', async (req, res) => {
    const url = req.query.url;
    
    try {
        const msql = await pool.query(
            "INSERT INTO PartTimeAvail(email, work_date) VALUES ($1, $2)",
            [email, work_date]
        );
    } catch (err) {

    }

    return res.status(200).json();
});

shortenerRouter.get('/', async (req, res) => {
    try {
        const msql = await pool.query(
            "Select * from url_mapping;"
        );
        return res.status(200).json(msql.rows);
    } catch (err) {
        console.log(err)
    }

});

module.exports = shortenerRouter
