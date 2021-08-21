const app = require('./services/server')
const { initDb, pool } = require('./services/db')
const { initCron } = require('./services/cron')
const PORT = process.env.PORT || 5000;

(async () => {

  try {
    // init postgres DB:
    await initDb();
    // init cron task
    await initCron();
  } catch (err) {
    console.log(err);
    pool.end();
    process.exit(1)
  }

  // init Express:
  app.listen(PORT , () => {
    console.log(`Express: started listening at port ${PORT}`);
  });
})();
