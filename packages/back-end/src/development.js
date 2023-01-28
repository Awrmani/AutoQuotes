const { MongoMemoryServer } = require('mongodb-memory-server');
const runServer = require('./backend');

// https://github.com/nodkz/mongodb-memory-server
const mongod = new MongoMemoryServer({ binary: { version: '6.0.0' } });
mongod.start().then(() => {
  process.env.NODE_ENV = 'development';
  process.env.MONGO_CONN_STR = mongod.getUri();

  runServer();
});
