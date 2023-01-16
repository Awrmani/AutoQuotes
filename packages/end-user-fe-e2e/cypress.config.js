const { defineConfig } = require('cypress');

module.exports = defineConfig({
  chromeWebSecurity: false,
  apiBaseUrl: 'TODO',
  viewportHeight: 937,
  viewportWidth: 1920,
  defaultCommandTimeout: 40000,
  // 'This also disables processing videos of passing tests'
  videoUploadOnPasses: false,
  videoCompression: false,
  e2e: {
    baseUrl: 'TODO',
  },
});
