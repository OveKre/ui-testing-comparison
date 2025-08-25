// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Global configuration
Cypress.on('uncaught:exception', (err, runnable) => {
  // Returning false here prevents Cypress from failing the test
  // on uncaught exceptions (useful for dealing with third-party scripts)
  return false;
});

// Global before hook
before(() => {
  // Run once before all tests
  cy.log('🚀 Cypress testide käivitamine...');
});

// Global beforeEach hook
beforeEach(() => {
  // Clear sessionStorage and localStorage before each test
  cy.window().then((win) => {
    win.sessionStorage.clear();
    win.localStorage.clear();
  });
  
  // Set viewport
  cy.viewport(1280, 720);
});

// Global afterEach hook
afterEach(() => {
  // Take screenshot on failure
  cy.screenshot({ capture: 'viewport', onlyOnFailure: true });
});

// Custom Cypress configuration
Cypress.config('defaultCommandTimeout', 10000);
Cypress.config('requestTimeout', 10000);
Cypress.config('responseTimeout', 10000);