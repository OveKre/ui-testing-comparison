describe('Sisselogimise testid - Cypress', () => {
  // Test andmed
  const testUsers = {
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
  };

  beforeEach(() => {
    // Külasta sisselogimise lehte enne iga testi
    cy.visit('/login');
    
    // Puhasta sessionStorage
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });
  });

  describe('Positiivsed testid', () => {
    it('Õnnestunud sisselogimine kehtivate andmetega', () => {
      // Täida sisselogimise vorm
      cy.get('[data-testid="username-input"]')
        .should('be.visible')
        .type(testUsers.valid.username);
      
      cy.get('[data-testid="password-input"]')
        .should('be.visible')
        .type(testUsers.valid.password);
      
      // Kliki sisselogimise nuppu
      cy.get('[data-testid="login-button"]')
        .should('be.visible')
        .should('contain.text', 'Logi sisse')
        .click();
      
      // Kontroll laadimise olekut
      cy.get('[data-testid="login-button"]').should('contain.text', 'Logib sisse...');
      
      // Kontroll, et suunatakse dashboard'i
      cy.url().should('include', '/dashboard');
      
      // Kontroll dashboard sisu
      cy.get('[data-testid="success-message"]')
        .should('be.visible')
        .should('contain.text', 'Sisselogimine õnnestus!');
      
      // Kontroll kasutaja info
      cy.get('#welcome-message')
        .should('contain.text', `Tere, ${testUsers.valid.name}!`);
      
      // Kontroll, et väljalogimise nupp on olemas
      cy.get('[data-testid="logout-button"]')
        .should('be.visible')
        .should('contain.text', 'Logi välja');
    });

    it('Sisselogimine admin kasutajaga', () => {
      cy.get('[data-testid="username-input"]').type(testUsers.admin.username);
      cy.get('[data-testid="password-input"]').type(testUsers.admin.password);
      cy.get('[data-testid="login-button"]').click();
      
      cy.url().should('include', '/dashboard');
      cy.get('#welcome-message').should('contain.text', `Tere, ${testUsers.admin.name}!`);
    });

    it('Dashboard funktsioonide testimine pärast sisselogimist', () => {
      // Logi sisse
      cy.get('[data-testid="username-input"]').type(testUsers.valid.username);
      cy.get('[data-testid="password-input"]').type(testUsers.valid.password);
      cy.get('[data-testid="login-button"]').click();
      
      cy.url().should('include', '/dashboard');
      
      // Testi dashboard nuppe
      cy.get('[data-testid="view-profile"]')
        .should('be.visible')
        .click();
      
      // Kontroll alert sõnumit (mock funktsioon)
      cy.window().its('alert').should('have.been.calledOnce');
      
      // Testi väljalogimist
      cy.get('[data-testid="logout-button"]').click();
      cy.url().should('eq', Cypress.config().baseUrl + '/');
    });
  });

  describe('Negatiivsed testid', () => {
    it('Sisselogimine valedate andmetega', () => {
      // Sisesta valed andmed
      cy.get('[data-testid="username-input"]').type(testUsers.invalid.username);
      cy.get('[data-testid="password-input"]').type(testUsers.invalid.password);
      cy.get('[data-testid="login-button"]').click();
      
      // Kontroll, et jääme sisselogimise lehele
      cy.url().should('include', '/login');
      
      // Kontroll vea sõnumit
      cy.get('#error-message')
        .should('be.visible')
        .should('contain.text', 'Vale kasutajanimi või parool!');
      
      // Kontroll, et nupp on tagasi töövalmis
      cy.get('[data-testid="login-button"]')
        .should('not.be.disabled')
        .should('contain.text', 'Logi sisse');
    });

    it('Vale parooli testimine', () => {
      cy.get('[data-testid="username-input"]').type(testUsers.valid.username);
      cy.get('[data-testid="password-input"]').type('valeParool123');
      cy.get('[data-testid="login-button"]').click();
      
      cy.get('#error-message').should('contain.text', 'Vale kasutajanimi või parool!');
      cy.url().should('include', '/login');
    });

    it('Mitteeksisteeriva kasutajaga sisselogimine', () => {
      cy.get('[data-testid="username-input"]').type('mitteeksisteerib');
      cy.get('[data-testid="password-input"]').type('ükskõikMilline');
      cy.get('[data-testid="login-button"]').click();
      
      cy.get('#error-message').should('contain.text', 'Vale kasutajanimi või parool!');
    });
  });

  describe('Edge case testid', () => {
    it('Tühjade väljade valideerimine', () => {
      // Kliki sisselogimise nuppu ilma andmeid sisestamata
      cy.get('[data-testid="login-button"]').click();
      
      // Kontroll välja vigu
      cy.get('#username-error')
        .should('be.visible')
        .should('contain.text', 'Kasutajanimi on kohustuslik!');
      
      cy.get('#password-error')
        .should('be.visible')
        .should('contain.text', 'Parool on kohustuslik!');
      
      // Kontroll, et väljad on punases raamis
      cy.get('[data-testid="username-input"]').should('have.class', 'error');
      cy.get('[data-testid="password-input"]').should('have.class', 'error');
      
      // Kontroll, et URL ei muutu
      cy.url().should('include', '/login');
    });

    it('Ainult kasutajanimi täidetud', () => {
      cy.get('[data-testid="username-input"]').type(testUsers.valid.username);
      cy.get('[data-testid="login-button"]').click();
      
      cy.get('#password-error').should('contain.text', 'Parool on kohustuslik!');
      cy.get('#username-error').should('not.be.visible');
    });

    it('Ainult parool täidetud', () => {
      cy.get('[data-testid="password-input"]').type(testUsers.valid.password);
      cy.get('[data-testid="login-button"]').click();
      
      cy.get('#username-error').should('contain.text', 'Kasutajanimi on kohustuslik!');
      cy.get('#password-error').should('not.be.visible');
    });

    it('Tühikutega andmete testimine', () => {
      cy.get('[data-testid="username-input"]').type('   ');
      cy.get('[data-testid="password-input"]').type('   ');
      cy.get('[data-testid="login-button"]').click();
      
      // Kontroll, et tühikud trimitakse ja käsitletakse tühja väljana
      cy.get('#username-error').should('contain.text', 'Kasutajanimi on kohustuslik!');
      cy.get('#password-error').should('contain.text', 'Parool on kohustuslik!');
    });

    it('Väga pikad andmed (stress test)', () => {
      const longString = 'a'.repeat(1000);
      
      cy.get('[data-testid="username-input"]').type(longString);
      cy.get('[data-testid="password-input"]').type(longString);
      cy.get('[data-testid="login-button"]').click();
      
      cy.get('#error-message').should('contain.text', 'Vale kasutajanimi või parool!');
    });

    it('Spetsiaalsete märkidega andmed', () => {
      cy.get('[data-testid="username-input"]').type('test<script>alert("xss")</script>');
      cy.get('[data-testid="password-input"]').type("' OR '1'='1' --");
      cy.get('[data-testid="login-button"]').click();
      
      cy.get('#error-message').should('contain.text', 'Vale kasutajanimi või parool!');
    });
  });

  describe('UI käitumise testid', () => {
    it('Sisselogimise vormi elementide olemasolu', () => {
      // Kontroll, et kõik vajalikud elemendid on olemas
      cy.get('[data-testid="username-input"]')
        .should('be.visible')
        .should('have.attr', 'placeholder', 'Sisesta kasutajanimi');
      
      cy.get('[data-testid="password-input"]')
        .should('be.visible')
        .should('have.attr', 'type', 'password')
        .should('have.attr', 'placeholder', 'Sisesta parool');
      
      cy.get('[data-testid="login-button"]')
        .should('be.visible')
        .should('not.be.disabled')
        .should('contain.text', 'Logi sisse');
      
      // Kontroll labelite olemasolu
      cy.get('label[for="username"]').should('contain.text', 'Kasutajanimi:');
      cy.get('label[for="password"]').should('contain.text', 'Parool:');
    });

    it('Navigeerimine avalehelt sisselogimise lehele', () => {
      cy.visit('/');
      
      cy.get('#login-btn')
        .should('be.visible')
        .should('contain.text', 'Logi sisse')
        .click();
      
      cy.url().should('include', '/login');
      cy.get('h2').should('contain.text', 'Logi oma kontole');
    });

    it('Tagasi avalehele link', () => {
      cy.get('.back-link')
        .should('be.visible')
        .should('contain.text', '← Tagasi avalehele')
        .click();
      
      cy.url().should('eq', Cypress.config().baseUrl + '/');
    });

    it('Test kasutajate info kuvamine', () => {
      // Kontroll, et test kasutajate info on nähtav
      cy.get('.test-credentials').should('be.visible');
      cy.get('.credential-item').should('have.length', 3);
      
      // Kontroll konkreetsete kasutajate olemasolu
      cy.contains('testuser').should('be.visible');
      cy.contains('admin').should('be.visible');
      cy.contains('john').should('be.visible');
    });
  });
});