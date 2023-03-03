const { defineConfig } = require('cypress');

module.exports = defineConfig({
  chromeWebSecurity: false,
  apiBaseUrl: 'http://localhost:8080/api',
  viewportHeight: 937,
  viewportWidth: 1920,
  defaultCommandTimeout: 40000,
  // 'This also disables processing videos of passing tests'
  videoUploadOnPasses: false,
  videoCompression: false,
  e2e: {
    baseUrl: 'http://localhost:3000',
  },
});
