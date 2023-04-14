const { defineConfig } = require('cypress');

module.exports = defineConfig({
  chromeWebSecurity: false,
  apiBaseUrl: 'http://127.0.0.1:8080/api',
  viewportHeight: 937,
  viewportWidth: 1920,
  defaultCommandTimeout: 40000,
  // 'This also disables processing videos of passing tests'
  videoUploadOnPasses: false,
  videoCompression: false,
  e2e: {
    baseUrl: 'http://127.0.0.1:3000',
  },
  retries: {
    runMode: 5,
    openMode: 0,
  },
});
