// global-teardown.js

async function globalTeardown() {
  console.log('🧹 Playwright testide globaalne puhastus...');
  
  // Võite lisada puhastamise loogika siia, kui vaja:
  // - Temporary failide kustutamine
  // - Test andmebaasi puhastamine  
  // - Cache'i puhastamine
  // jne
  
  console.log('✅ Puhastus lõpetatud');
}

module.exports = globalTeardown;