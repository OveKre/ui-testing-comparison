// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom command - sisselogimiseks
Cypress.Commands.add('login', (username, password) => {
  cy.visit('/login');
  cy.get('[data-testid="username-input"]').type(username);
  cy.get('[data-testid="password-input"]').type(password);
  cy.get('[data-testid="login-button"]').click();
});

// Custom command - kiire sisselogimine kehtiva kasutajaga
Cypress.Commands.add('loginAsTestUser', () => {
  cy.login('testuser', 'password123');
  cy.url().should('include', '/dashboard');
});

// Custom command - admin kasutajana sisselogimine
Cypress.Commands.add('loginAsAdmin', () => {
  cy.login('admin', 'admin123');
  cy.url().should('include', '/dashboard');
});

// Custom command - kontrollida vea sõnumit
Cypress.Commands.add('checkErrorMessage', (expectedMessage) => {
  cy.get('#error-message')
    .should('be.visible')
    .should('contain.text', expectedMessage);
});

// Custom command - kontrollida õnnestumise sõnumit
Cypress.Commands.add('checkSuccessMessage', (expectedMessage) => {
  cy.get('#success-message')
    .should('be.visible')
    .should('contain.text', expectedMessage);
});

// Custom command - kontrollida välja viga
Cypress.Commands.add('checkFieldError', (fieldName, expectedMessage) => {
  cy.get(`#${fieldName}-error`)
    .should('be.visible')
    .should('contain.text', expectedMessage);
  
  cy.get(`[data-testid="${fieldName}-input"]`)
    .should('have.class', 'error');
});

// Custom command - puhastada sessiooni andmed
Cypress.Commands.add('clearSession', () => {
  cy.window().then((win) => {
    win.sessionStorage.clear();
    win.localStorage.clear();
  });
});

// Custom command - oodata laadimist
Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('body').should('be.visible');
  cy.document().should('exist');
});

// Custom command - kontrollida dashboard'i
Cypress.Commands.add('verifyDashboard', (expectedUserName) => {
  cy.url().should('include', '/dashboard');
  cy.get('[data-testid="success-message"]')
    .should('be.visible')
    .should('contain.text', 'Sisselogimine õnnestus!');
  
  if (expectedUserName) {
    cy.get('#welcome-message')
      .should('contain.text', `Tere, ${expectedUserName}!`);
  }
});

// Custom command - väljalogimiseks
Cypress.Commands.add('logout', () => {
  cy.get('[data-testid="logout-button"]').click();
  cy.url().should('eq', Cypress.config().baseUrl + '/');
});

// Custom command - API päringu tegemiseks
Cypress.Commands.add('apiRequest', (method, endpoint, body = null) => {
  return cy.request({
    method: method,
    url: `${Cypress.config().baseUrl}/api${endpoint}`,
    body: body,
    failOnStatusCode: false
  });
});

// Custom command - kasutajate nimekirja saamiseks
Cypress.Commands.add('getUsers', () => {
  return cy.apiRequest('GET', '/users');
});

// Overwrite visit command to add common options
Cypress.Commands.overwrite('visit', (originalFn, url, options = {}) => {
  const defaultOptions = {
    timeout: 30000,
    failOnStatusCode: false
  };
  
  return originalFn(url, { ...defaultOptions, ...options });
});

// Overwrite type command to add delay for more realistic typing
Cypress.Commands.overwrite('type', (originalFn, element, text, options = {}) => {
  const defaultOptions = {
    delay: 50 // milliseconds between keystrokes
  };
  
  return originalFn(element, text, { ...defaultOptions, ...options });
});