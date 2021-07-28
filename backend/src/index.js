const app = require('./services/server')
const db = require('./services/db')
const PORT = process.env.PORT || 5000;

(async () => {
  // init postgres DB:
  await db.init();
  // init Express:
  app.listen(PORT , () => {
    console.log(`Express: started listening at port ${PORT }`);
  });
})();
