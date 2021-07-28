const { Pool } = require('pg')
const pool = new Pool({
  user: 'tester',
  host: 'db',
  database: 'GDS',
  password: 'password1',
  port: 5432,
})

async function init() {
  console.log("Connecting to postgres DB...");
  await pool.connect();
  console.log("Successfully connected to postgres DB");
}

module.exports.init = init;
