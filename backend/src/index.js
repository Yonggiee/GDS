const app = require('./services/server')
const { initDb } = require('./services/db')
const PORT = process.env.PORT || 5000;

(async () => {
  // init postgres DB:
  await initDb();
  // init Express:
  app.listen(PORT , () => {
    console.log(`Express: started listening at port ${PORT}`);
  });
})();
