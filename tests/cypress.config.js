const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // Rakenduse baas URL
    baseUrl: 'http://localhost:3000',
    
    // Test failide asukoht (õige tee)
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    
    // Toetavate failide asukoht
    supportFile: 'cypress/support/e2e.js',
    
    // Fixtures asukoht
    fixturesFolder: 'cypress/fixtures',
    
    // Screenshots ja videod
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    
    // Test seadistused
    viewportWidth: 1280,
    viewportHeight: 720,
    
    // Timeout seadistused
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    pageLoadTimeout: 30000,
    
    // Testimise käitumine
    video: true,
    screenshotOnRunFailure: true,
    trashAssetsBeforeRuns: true,
    
    // Retry seadistused
    retries: {
      runMode: 2,
      openMode: 0
    },
    
    // Environment muutujad
    env: {
      // Test kasutajad
      testUsers: {
        valid: {
          username: 'testuser',
          password: 'password123',
          name: 'Test Kasutaja'
        },
        admin: {
          username: 'admin',
          password: 'admin123',
          name: 'Admin'
        },
        invalid: {
          username: 'wronguser',
          password: 'wrongpass'
        }
      },
      
      // API endpoints
      apiUrl: 'http://localhost:3000/api',
      
      // Test seadistused
      testTimeout: 5000
    }
  },
});
