const runServer = require('./backend');

process.env.NODE_ENV = 'production';
runServer();
