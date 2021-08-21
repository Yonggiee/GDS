const { DB_USER, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT } = require('../utils/constants');
const { Pool } = require('pg');
const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: DB_PORT,
  max: 10,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 0,
})

async function initDb() {
  console.log('Connecting to postgres DB...');
  const client = await pool.connect();
  console.log('Successfully connected to postgres DB');
  client.release();
}

module.exports = {
  initDb,
  pool
}
