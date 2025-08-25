# UI Testing Comparison: Cypress vs Playwright

[![Tests](https://github.com/tak24/ui-testing-comparison/actions/workflows/tests.yml/badge.svg)](https://github.com/tak24/ui-testing-comparison/actions/workflows/tests.yml)


## 📋 Projekti kirjeldus

See projekt võrdleb kahte populaarset UI testimise raamistikku:
- **Cypress** - JavaScript-i põhine E2E testimise raamistik
- **Playwright** - Microsoft'i loodud moodne cross-browser testimise raamistik

Mõlemas raamistikus on loodud samaväärsed testid **sisselogimise funktsionaalsuse** testimiseks.

## 🏗️ Projekti struktuur

```
ui-testing-comparison/
├── public/                        # Frontend failid (HTML, CSS, JS)
│   ├── index.html                # Avalehekülg
│   ├── login.html                # Sisselogimise vorm
│   ├── dashboard.html            # Dashboard (pärast sisselogimist)
│   ├── style.css                 # Stiilid
│   └── script.js                 # Frontend JavaScript
├── server.js                     # Express.js server
├── package.json                  # Rakenduse sõltuvused
│
├── tests/                         # Testide kaust
│   ├── cypress/                   # Cypress testid
│   │   ├── e2e/login.cy.js       # Sisselogimise testid
│   │   ├── support/              # Tugifailid ja custom commands
│   │   └── cypress.config.js     # Cypress konfiguratsioon
│   │
│   ├── playwright/               # Playwright testid
│   │   ├── tests/login.spec.js   # Sisselogimise testid
│   │   ├── global-setup.js       # Globaalne seadistus
│   │   ├── global-teardown.js    # Globaalne lõpetus
│   │   └── playwright.config.js  # Playwright konfiguratsioon
│   │
│   └── package.json              # Testide sõltuvused
│
├── docs/
│   └── test-report.md            # Detailne raamistike võrdlus
│
├── README.md                     # See fail
└── .gitignore                    # Git ignore reeglid
```

## 🚀 Kiire alustamine

### 1. Repositooriumi kloneerimine

```bash
git clone https://github.com/tak24/ui-testing-comparison.git
cd ui-testing-comparison
```

### 2. Rakenduse käivitamine

```bash
# Installi sõltuvused
npm install

# Käivita rakendus
npm start
```

Rakendus käib aadressil: http://localhost:3000

### 3. Testide ettevalmistamine

Ava uus terminal aken ja:

```bash
# Liigu testide kausta
cd tests
npm install

# Installi Playwright brauserid (kui kasutad Playwright)
npx playwright install
```

## 🧪 Testide käivitamine

### Cypress testid

```bash
# Visuaalne käivitamine (GUI)
npm run cypress:open

# Käsurea käivitamine
npm run cypress:run

# Headless režiim
npm run cypress:run:headless
```

### Playwright testid

```bash
# Kõik testid
npm run playwright:test

# Testid koos UI-ga
npm run playwright:test:headed

# Debug režiim
npm run playwright:test:debug

# Aruande vaatamine
npm run playwright:report
```

### Kõik testid korraga

```bash
# Käivita nii Cypress kui Playwright testid
npm run test:all
```

## 📊 Testitavad stsenaariumid

Mõlemas raamistikus on implementeeritud järgmised testid:

### ✅ Positiivsed testid (3)
- Õnnestunud sisselogimine kehtivate andmetega
- Admin kasutaja sisselogimine
- Dashboard funktsioonide testimine

### ❌ Negatiivsed testid (3)
- Sisselogimine valedate andmetega
- Vale parooli testimine
- Mitteeksisteeriva kasutaja testimine

### 🔄 Edge case testid (6)
- Tühjade väljade valideerimine
- Osaliste andmete testimine
- Tühikutega andmete käsitlemine
- Stress test (pikad andmed)
- XSS ja injection kaitsmise test
- Klaviatuuriga navigeerimine (ainult Playwright)

### 🎨 UI käitumise testid (6)
- Vormi elementide olemasolu
- Navigeerimine lehtede vahel
- Responsive käitumine
- CSS animatsioonide kontroll
- API päringute testimine
- Võrgu vigade käsitlemine

## 👤 Test kasutajad

Rakenduses on järgmised test kasutajad:

| Kasutajanimi | Parool | Roll |
|--------------|---------|------|
| `testuser` | `password123` | Tavakasutaja |
| `admin` | `admin123` | Administraator |
| `john` | `john123` | Tavakasutaja |

## 📈 Testide tulemused

| Raamistik | Testide arv | Õnnestunud | Ebaõnnestunud | Käivitamise aeg |
|-----------|-------------|------------|---------------|-----------------|
| Cypress | 18 | ✅ 18 | ❌ 0 | ~57 sekundit |
| Playwright | 18 | ✅ 18 | ❌ 0 | ~40 sekundit |

**Playwright on ~30% kiirem** tänu paremale paralleelsuse toele ja optimeeritud brauseri haldusele.

## 🔧 Konfiguratsioon

### Cypress konfiguratsioon
- **Baas URL:** http://localhost:3000
- **Viewport:** 1280x720
- **Timeout:** 10 sekundid
- **Retry:** 2 korda (run mode)
- **Video:** Sisse lülitatud
- **Screenshots:** Vea korral

### Playwright konfiguratsioon
- **Baas URL:** http://localhost:3000
- **Brauserid:** Chrome, Firefox, Safari, Edge
- **Viewport:** 1280x720
- **Timeout:** 10 sekundid (actions), 30 sekundid (navigation)
- **Paralleelsus:** Täielik
- **Trace:** Esimese retry korral

## 📖 Dokumentatsioon

Detailne võrdlusanalüüs koos praktiliste näidete ja soovitustega: [docs/test-report.md](docs/test-report.md)

## 🔗 Kasulikud lingid

### Cypress
- [Cypress dokumentatsioon](https://docs.cypress.io/)
- [Best practices](https://docs.cypress.io/guides/references/best-practices)
- [API reference](https://docs.cypress.io/api/table-of-contents)

### Playwright
- [Playwright dokumentatsioon](https://playwright.dev/)
- [Test generator](https://playwright.dev/docs/codegen)
- [Trace viewer](https://playwright.dev/docs/trace-viewer)

## 🐛 Probleemide lahendamine

### Rakendus ei käivitu
```bash
# Kontrolli, et oled õiges kaustas
cd app

# Kontrolli Node.js versiooni (peaks olema v14+)
node --version

# Kontrolli porti
netstat -an | grep 3000
```

### Cypress testid ebaõnnestuvad
```bash
# Puhasta cache
npx cypress cache clear

# Kontrolli brauserite olemasolu
npx cypress verify
```

### Playwright testid ebaõnnestuvad
```bash
# Installi brauserid uuesti
npx playwright install

# Kontrolli süsteemi sõltuvusi
npx playwright install-deps
```

### Võrgu ühenduse probleemid
```bash
# Kontrolli, et rakendus käib
curl http://localhost:3000

# Testi CORS seadistusi
curl -H "Origin: http://localhost:3000" http://localhost:3000/api/users
```

## 🤝 Arendamine

### Uute testide lisamine

1. **Cypress testid:** Lisa fail `tests/cypress/e2e/` kausta
2. **Playwright testid:** Lisa fail `tests/playwright/tests/` kausta
3. **Kasuta data-testid atribuute** elementide leidmiseks
4. **Järgi olemasolevas projektis kasutatavat struktuuri**

### Code style

```javascript
// Cypress
describe('Testi grupp', () => {
  it('konkreetne test', () => {
    cy.get('[data-testid="element"]').should('be.visible');
  });
});

// Playwright  
test.describe('Testi grupp', () => {
  test('konkreetne test', async ({ page }) => {
    await expect(page.locator('[data-testid="element"]')).toBeVisible();
  });
});
```

## 📝 Licence

See projekt on loodud õppe eesmärkidel TAK24 kursuse raames.

## 👨‍💻 Autor

**TAK24 üliõpilane**
- 📧 E-mail: [student@example.ee](mailto:student@example.ee)
- 📚 Kursus: TAK24
- 📅 Aasta: 2025

---

## 🎯 Kokkuvõte

See projekt demonstreerib kahe populaarse UI testimise raamistiku praktilist kasutamist ja võrdlust. Mõlemad raamistikud suudavad edukalt testida veebirakenduse sisselogimise funktsionaalsust, kuid erinevad oma tugevuste ja nõrkuste poolest.

**Peamised õppetunnid:**
1. **Cypress** - algajasõbralik, suurepärane debugging
2. **Playwright** - kiirem, parem cross-browser tugi
3. **Valik sõltub vajadusest** - projekt, meeskond, nõuded

Detailsem analüüs ja soovitused on saadaval [test-report.md](docs/test-report.md) failis.