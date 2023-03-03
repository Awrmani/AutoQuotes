// This has to be here before backend is imported
process.env.NODE_ENV = 'production';

const runServer = require('./backend');

runServer();
