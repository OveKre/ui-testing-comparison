// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  // Test failide asukoht
  testDir: './tests',
  
  // Täielik paralleelne käivitamine
  fullyParallel: true,
  
  // Keela testide käivitamine CI-s, kui on uncommitted muudatused
  forbidOnly: !!process.env.CI,
  
  // Retry seadistused
  retries: process.env.CI ? 2 : 0,
  
  // Paralleelsete töötajate arv
  workers: process.env.CI ? 1 : undefined,
  
  // Aruandluse seadistused
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/results.xml' }],
    ['list']
  ],
  
  // Globaalsed seadistused kõigile testidele
  use: {
    // Rakenduse baas URL
    baseURL: 'http://localhost:3000',
    
    // Brauser seadistused
    headless: true,
    viewport: { width: 1280, height: 720 },
    
    // Screenshot ja video seadistused
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    
    // Trace seadistused
    trace: 'on-first-retry',
    
    // Timeout seadistused
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },

  // Projekt seadistused erinevatele brauseritele
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Mobile projektid */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },

    /* Microsoft Edge */
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },

    /* Google Chrome */
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ],

  // Kasuta juba töötavat serverit
  // webServer: {
  //   command: 'cd ../../ && npm start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: true,
  //   timeout: 120 * 1000,
  // },
  
  // Globaalsed environment muutujad
  globalSetup: require.resolve('./global-setup.js'),
  globalTeardown: require.resolve('./global-teardown.js'),
});