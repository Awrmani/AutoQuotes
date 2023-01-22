const mongoUnit = require('mongo-unit');
const runServer = require('./backend');

mongoUnit
  .start() // Spin up an in-memory mongoDB
  .then(url => {
    process.env.NODE_ENV = 'development';
    process.env.MONGO_CONN_STR = url;

    runServer();
  });
