// This has to be here before backend is imported
process.env.NODE_ENV = 'development';

const { MongoMemoryServer } = require('mongodb-memory-server');
const runServer = require('./backend');

// https://github.com/nodkz/mongodb-memory-server
const mongod = new MongoMemoryServer({ binary: { version: '6.0.3' } });
mongod.start().then(() => {
  process.env.MONGO_CONN_STR = mongod.getUri();

  runServer();
});
