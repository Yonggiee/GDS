const { Pool } = require('pg')
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT
})

async function initDb() {
  console.log('Connecting to postgres DB...');
  await pool.connect();
  console.log('Successfully connected to postgres DB');
}

module.exports = {
  initDb,
  pool
}
