const { test, expect } = require('@playwright/test');

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

test.describe('Sisselogimise testid - Playwright', () => {
  
  test.beforeEach(async ({ page }) => {
    // Külasta sisselogimise lehte enne iga testi
    await page.goto('http://localhost:3000/login');
    
    // Puhasta sessionStorage
    await page.evaluate(() => {
      sessionStorage.clear();
      localStorage.clear();
    });
  });

  test.describe('Positiivsed testid', () => {
    
    test('Õnnestunud sisselogimine kehtivate andmetega', async ({ page }) => {
      // Täida sisselogimise vorm
      await page.fill('[data-testid="username-input"]', testUsers.valid.username);
      await page.fill('[data-testid="password-input"]', testUsers.valid.password);
      
      // Kontrolli, et nupp on nähtav ja klõpsatav
      const loginButton = page.locator('[data-testid="login-button"]');
      await expect(loginButton).toBeVisible();
      await expect(loginButton).toContainText('Logi sisse');
      
      // Kliki sisselogimise nuppu
      await loginButton.click();
      
      // Kontrolli laadimise olekut
      await expect(loginButton).toContainText('Logib sisse...');
      
      // Oota suunamist dashboard'i
      await page.waitForURL('**/dashboard');
      
      // Kontrolli dashboard sisu
      const successMessage = page.locator('[data-testid="success-message"]');
      await expect(successMessage).toBeVisible();
      await expect(successMessage).toContainText('Sisselogimine õnnestus!');
      
      // Kontrolli kasutaja info
      const welcomeMessage = page.locator('#welcome-message');
      await expect(welcomeMessage).toContainText(`Tere, ${testUsers.valid.name}!`);
      
      // Kontrolli väljalogimise nupu olemasolu
      const logoutButton = page.locator('[data-testid="logout-button"]');
      await expect(logoutButton).toBeVisible();
      await expect(logoutButton).toContainText('Logi välja');
    });

    test('Sisselogimine admin kasutajaga', async ({ page }) => {
      await page.fill('[data-testid="username-input"]', testUsers.admin.username);
      await page.fill('[data-testid="password-input"]', testUsers.admin.password);
      await page.click('[data-testid="login-button"]');
      
      await page.waitForURL('**/dashboard');
      
      const welcomeMessage = page.locator('#welcome-message');
      await expect(welcomeMessage).toContainText(`Tere, ${testUsers.admin.name}!`);
    });

    test('Dashboard funktsioonide testimine pärast sisselogimist', async ({ page }) => {
      // Logi sisse
      await page.fill('[data-testid="username-input"]', testUsers.valid.username);
      await page.fill('[data-testid="password-input"]', testUsers.valid.password);
      await page.click('[data-testid="login-button"]');
      
      await page.waitForURL('**/dashboard');
      
      // Testi dashboard nuppe
      const viewProfileBtn = page.locator('[data-testid="view-profile"]');
      await expect(viewProfileBtn).toBeVisible();
      
      // Kuula alert dialogid
      page.on('dialog', async dialog => {
        expect(dialog.message()).toContain('Profiili vaatamine');
        await dialog.accept();
      });
      
      await viewProfileBtn.click();
      
      // Testi väljalogimist
      await page.click('[data-testid="logout-button"]');
      await expect(page).toHaveURL('http://localhost:3000/');
    });
  });

  test.describe('Negatiivsed testid', () => {
    
    test('Sisselogimine valedate andmetega', async ({ page }) => {
      // Sisesta valed andmed
      await page.fill('[data-testid="username-input"]', testUsers.invalid.username);
      await page.fill('[data-testid="password-input"]', testUsers.invalid.password);
      await page.click('[data-testid="login-button"]');
      
      // Kontrolli, et jääme sisselogimise lehele
      await expect(page).toHaveURL(/.*login.*/);
      
      // Kontrolli vea sõnumit
      const errorMessage = page.locator('#error-message');
      await expect(errorMessage).toBeVisible();
      await expect(errorMessage).toContainText('Vale kasutajanimi või parool!');
      
      // Kontrolli, et nupp on tagasi töövalmis
      const loginButton = page.locator('[data-testid="login-button"]');
      await expect(loginButton).not.toBeDisabled();
      await expect(loginButton).toContainText('Logi sisse');
    });

    test('Vale parooli testimine', async ({ page }) => {
      await page.fill('[data-testid="username-input"]', testUsers.valid.username);
      await page.fill('[data-testid="password-input"]', 'valeParool123');
      await page.click('[data-testid="login-button"]');
      
      const errorMessage = page.locator('#error-message');
      await expect(errorMessage).toContainText('Vale kasutajanimi või parool!');
      await expect(page).toHaveURL(/.*login.*/);
    });

    test('Mitteeksisteeriva kasutajaga sisselogimine', async ({ page }) => {
      await page.fill('[data-testid="username-input"]', 'mitteeksisteerib');
      await page.fill('[data-testid="password-input"]', 'ükskõikMilline');
      await page.click('[data-testid="login-button"]');
      
      const errorMessage = page.locator('#error-message');
      await expect(errorMessage).toContainText('Vale kasutajanimi või parool!');
    });
  });

  test.describe('Edge case testid', () => {
    
    test('Tühjade väljade valideerimine', async ({ page }) => {
      // Kliki sisselogimise nuppu ilma andmeid sisestamata
      await page.click('[data-testid="login-button"]');
      
      // Oota, kuni valideerimise vigade sõnumid ilmuvad
      await page.waitForSelector('#username-error.show', { timeout: 10000 });
      await page.waitForSelector('#password-error.show', { timeout: 10000 });
      
      // Kontrolli välja vigu
      const usernameError = page.locator('#username-error');
      const passwordError = page.locator('#password-error');
      
      await expect(usernameError).toBeVisible();
      await expect(usernameError).toContainText('Kasutajanimi on kohustuslik!');
      
      await expect(passwordError).toBeVisible();
      await expect(passwordError).toContainText('Parool on kohustuslik!');
      
      // Kontrolli, et väljad on punases raamis
      const usernameInput = page.locator('[data-testid="username-input"]');
      const passwordInput = page.locator('[data-testid="password-input"]');
      
      await expect(usernameInput).toHaveClass(/error/);
      await expect(passwordInput).toHaveClass(/error/);
      
      // Kontrolli, et URL ei muutu
      await expect(page).toHaveURL(/.*login.*/);
    });

    test('Ainult kasutajanimi täidetud', async ({ page }) => {
      await page.fill('[data-testid="username-input"]', testUsers.valid.username);
      await page.click('[data-testid="login-button"]');
      
      // Oota kuni parooli viga ilmub
      await page.waitForSelector('#password-error.show', { timeout: 10000 });
      
      const passwordError = page.locator('#password-error');
      await expect(passwordError).toContainText('Parool on kohustuslik!');
      
      // Kontrolli, et kasutajanimi viga ei ole nähtav
      const usernameError = page.locator('#username-error');
      await expect(usernameError).not.toBeVisible();
    });

    test('Ainult parool täidetud', async ({ page }) => {
      await page.fill('[data-testid="password-input"]', testUsers.valid.password);
      await page.click('[data-testid="login-button"]');
      
      // Oota kuni kasutajanimi viga ilmub
      await page.waitForSelector('#username-error.show', { timeout: 10000 });
      
      const usernameError = page.locator('#username-error');
      await expect(usernameError).toContainText('Kasutajanimi on kohustuslik!');
      
      // Kontrolli, et parooli viga ei ole nähtav
      const passwordError = page.locator('#password-error');
      await expect(passwordError).not.toBeVisible();
    });

    test('Tühikutega andmete testimine', async ({ page }) => {
      await page.fill('[data-testid="username-input"]', '   ');
      await page.fill('[data-testid="password-input"]', '   ');
      await page.click('[data-testid="login-button"]');
      
      // Kontrolli, et tühikud trimitakse ja käsitletakse tühja väljana
      const usernameError = page.locator('#username-error');
      const passwordError = page.locator('#password-error');
      
      await expect(usernameError).toContainText('Kasutajanimi on kohustuslik!');
      await expect(passwordError).toContainText('Parool on kohustuslik!');
    });

    test('Väga pikad andmed (stress test)', async ({ page }) => {
      const longString = 'a'.repeat(1000);
      
      await page.fill('[data-testid="username-input"]', longString);
      await page.fill('[data-testid="password-input"]', longString);
      await page.click('[data-testid="login-button"]');
      
      const errorMessage = page.locator('#error-message');
      await expect(errorMessage).toContainText('Vale kasutajanimi või parool!');
    });

    test('Spetsiaalsete märkidega andmed', async ({ page }) => {
      await page.fill('[data-testid="username-input"]', 'test<script>alert("xss")</script>');
      await page.fill('[data-testid="password-input"]', "' OR '1'='1' --");
      await page.click('[data-testid="login-button"]');
      
      const errorMessage = page.locator('#error-message');
      await expect(errorMessage).toContainText('Vale kasutajanimi või parool!');
    });

    test('Klaviatuuriga navigeerimine', async ({ page }) => {
      const usernameInput = page.locator('[data-testid="username-input"]');
      const passwordInput = page.locator('[data-testid="password-input"]');
      const loginButton = page.locator('[data-testid="login-button"]');
      
      // Tab navigation
      await usernameInput.focus();
      await page.keyboard.press('Tab');
      await expect(passwordInput).toBeFocused();
      
      await page.keyboard.press('Tab');
      await expect(loginButton).toBeFocused();
      
      // Enter key submit
      await usernameInput.fill(testUsers.valid.username);
      await passwordInput.fill(testUsers.valid.password);
      await passwordInput.press('Enter');
      
      await page.waitForURL('**/dashboard');
    });
  });

  test.describe('UI käitumise testid', () => {
    
    test('Sisselogimise vormi elementide olemasolu', async ({ page }) => {
      // Kontrolli, et kõik vajalikud elemendid on olemas
      const usernameInput = page.locator('[data-testid="username-input"]');
      const passwordInput = page.locator('[data-testid="password-input"]');
      const loginButton = page.locator('[data-testid="login-button"]');
      
      await expect(usernameInput).toBeVisible();
      await expect(usernameInput).toHaveAttribute('placeholder', 'Sisesta kasutajanimi');
      
      await expect(passwordInput).toBeVisible();
      await expect(passwordInput).toHaveAttribute('type', 'password');
      await expect(passwordInput).toHaveAttribute('placeholder', 'Sisesta parool');
      
      await expect(loginButton).toBeVisible();
      await expect(loginButton).not.toBeDisabled();
      await expect(loginButton).toContainText('Logi sisse');
      
      // Kontrolli labelite olemasolu
      const usernameLabel = page.locator('label[for="username"]');
      const passwordLabel = page.locator('label[for="password"]');
      
      await expect(usernameLabel).toContainText('Kasutajanimi:');
      await expect(passwordLabel).toContainText('Parool:');
    });

    test('Navigeerimine avalehelt sisselogimise lehele', async ({ page }) => {
      await page.goto('http://localhost:3000/');
      
      const loginBtn = page.locator('#login-btn');
      await expect(loginBtn).toBeVisible();
      await expect(loginBtn).toContainText('Logi sisse');
      
      await loginBtn.click();
      
      await expect(page).toHaveURL(/.*login.*/);
      
      const heading = page.locator('h2');
      await expect(heading).toContainText('Logi oma kontole');
    });

    test('Tagasi avalehele link', async ({ page }) => {
      const backLink = page.locator('.back-link');
      await expect(backLink).toBeVisible();
      await expect(backLink).toContainText('← Tagasi avalehele');
      
      await backLink.click();

      await expect(page).toHaveURL('http://localhost:3000/');
    });

    test('Test kasutajate info kuvamine', async ({ page }) => {
      // Kontrolli, et test kasutajate info on nähtav
      const testCredentials = page.locator('.test-credentials');
      await expect(testCredentials).toBeVisible();
      
      const credentialItems = page.locator('.credential-item');
      await expect(credentialItems).toHaveCount(3);
      
      // Kontrolli konkreetsete kasutajate olemasolu
      await expect(page.locator('text=testuser')).toBeVisible();
      await expect(page.locator('text=admin')).toBeVisible();
      await expect(page.locator('text=john')).toBeVisible();
    });

    test('Responsive käitumine', async ({ page }) => {
      // Test mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      
      const loginCard = page.locator('.login-card');
      await expect(loginCard).toBeVisible();
      
      const usernameInput = page.locator('[data-testid="username-input"]');
      const passwordInput = page.locator('[data-testid="password-input"]');
      
      await expect(usernameInput).toBeVisible();
      await expect(passwordInput).toBeVisible();
      
      // Test desktop viewport
      await page.setViewportSize({ width: 1280, height: 720 });
      
      await expect(loginCard).toBeVisible();
      await expect(usernameInput).toBeVisible();
      await expect(passwordInput).toBeVisible();
    });

    test('CSS animatsioonide kontroll', async ({ page }) => {
      const loginCard = page.locator('.login-card');
      
      // Kontrolli, et animatsioon on olemas
      const animation = await loginCard.evaluate(el => {
        return window.getComputedStyle(el).animation;
      });
      
      expect(animation).toBeTruthy();
    });
  });

  test.describe('API ja võrgu testid', () => {
    
    test('Sisselogimise API päring', async ({ page }) => {
      // Kuula API päringuid
      let requestData = null;
      let responseData = null;
      
      page.on('request', request => {
        if (request.url().includes('/api/login')) {
          requestData = request.postData();
        }
      });
      
      page.on('response', async response => {
        if (response.url().includes('/api/login')) {
          responseData = await response.json();
        }
      });
      
      // Tee sisselogimine
      await page.fill('[data-testid="username-input"]', testUsers.valid.username);
      await page.fill('[data-testid="password-input"]', testUsers.valid.password);
      await page.click('[data-testid="login-button"]');
      
      await page.waitForURL('**/dashboard');
      
      // Kontrolli päringut
      expect(requestData).toBeTruthy();
      const parsedRequest = JSON.parse(requestData);
      expect(parsedRequest.username).toBe(testUsers.valid.username);
      expect(parsedRequest.password).toBe(testUsers.valid.password);
      
      // Kontrolli vastust
      expect(responseData).toBeTruthy();
      expect(responseData.success).toBe(true);
      expect(responseData.user.username).toBe(testUsers.valid.username);
    });

    test('Võrgu viga käsitlemine', async ({ page }) => {
      // Blokeeri API päringud
      await page.route('**/api/login', route => route.abort());
      
      await page.fill('[data-testid="username-input"]', testUsers.valid.username);
      await page.fill('[data-testid="password-input"]', testUsers.valid.password);
      await page.click('[data-testid="login-button"]');
      
      // Kontrolli vea sõnumit
      const errorMessage = page.locator('#error-message');
      await expect(errorMessage).toBeVisible();
      await expect(errorMessage).toContainText('Serveri viga');
    });
  });
});