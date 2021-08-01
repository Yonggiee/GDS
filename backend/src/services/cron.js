const cron = require('node-cron');
const { pool } = require('../services/db');

function initCron() {
  console.log('Running cron task schedule')
  cron.schedule('0 0 * * *', () => {
    console.log('Running daily cron...')
    pool.query(
      'DELETE FROM url_mapping \
        WHERE last_accessed < (NOW() - INTERVAL 1 YEAR);',
    );
    console.log('Successfully ran daily cron.')
  });
}

module.exports = {
  initCron
}
