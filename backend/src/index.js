const app = require('./services/server')
const { initDb } = require('./services/db')
const PORT = process.env.PORT || 5000;

(async () => {
  // init postgres DB:
  try {
    await initDb();
  } catch (err) {
    console.log(err);
    process.exit(1)
  }

  // init Express:
  app.listen(PORT , () => {
    console.log(`Express: started listening at port ${PORT}`);
  });
})();
