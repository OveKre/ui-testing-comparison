// global-setup.js
const { chromium } = require('@playwright/test');

async function globalSetup() {
  console.log('🚀 Playwright testide globaalne seadistus...');
  
  // Kontrolli, et rakendus on kättesaadav
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    await page.goto('http://localhost:3000', { timeout: 30000 });
    console.log('✅ Rakendus on kättesaadav');
  } catch (error) {
    console.error('❌ Rakendus ei ole kättesaadav:', error.message);
    throw new Error('Rakendus peab olema käivitatud enne teste!');
  } finally {
    await browser.close();
  }
  
  console.log('📋 Test kasutajad valmis:');
  console.log('   - testuser / password123');
  console.log('   - admin / admin123');
  console.log('   - john / john123');
}

module.exports = globalSetup;