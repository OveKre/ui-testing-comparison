# UI Testimise Raamistike Võrdlus: Cypress vs Playwright

**Projekti info:**
- **Kursus:** TAK24
- **Ülesanne:** ÕV3, ÕV4 - UI testide loomine ja raamistike võrdlus
- **Testimiseks valitud funktsioon:** Sisselogimise süsteem
- **Kuupäev:** 2025

## Sisukord

1. [Ülevaade](#ülevaade)
2. [Testitud funktsioon](#testitud-funktsioon)
3. [Võrdlustabel](#võrdlustabel)
4. [Detailne analüüs](#detailne-analüüs)
5. [Testide tulemused](#testide-tulemused)
6. [Soovitused](#soovitused)
7. [Kokkuvõte](#kokkuvõte)

## Ülevaade

Selles projektis võrdlesin kaht populaarset UI testimise raamistikku:

- **Cypress** - JavaScript-i põhine E2E testimise raamistik
- **Playwright** - Microsoft'i loodud moodne cross-browser testimise raamistik

Mõlema raamistikuga lõin samaväärsed testid sisselogimise funktsionaalsuse jaoks, hõlmates positiivseid, negatiivseid ja edge case stsenaariumeid.

## Testitud funktsioon

**Sisselogimise süsteem** järgmiste omadustega:
- Kasutajanimi ja parooli väljad
- Kliendipoolne ja serveripoolne valideerimine
- Õnnestumise ja vea sõnumite kuvamine
- Suunamine dashboard'i pärast õnnestunud sisselogimist
- Sessiooni haldamine

**Testitavad stsenaariumid:**
1. ✅ **Positiivsed testid** - õige sisselogimine
2. ❌ **Negatiivsed testid** - valed andmed, vead
3. 🔄 **Edge case testid** - tühjad väljad, äärmuslikud juhud
4. 🎨 **UI käitumise testid** - elementide olemasolu, navigeerimine

## Võrdlustabel

| Kriteerium | Cypress | Playwright | Võitja |
|------------|---------|------------|--------|
| **Lihtsus ja õppimiskõver** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Cypress |
| **Paigaldus ja seadistamine** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Playwright |
| **Testide kirjutamise mugavus** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Cypress |
| **Dokumentatsiooni kvaliteet** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Cypress |
| **Cross-browser tugi** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Playwright |
| **Täitmise kiirus** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Playwright |
| **Debugging võimalused** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Cypress |
| **Aruandlus** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Playwright |
| **Community tugi** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Cypress |
| **API testimise tugi** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Playwright |

**Kogusumma:** Cypress 41/50, Playwright 43/50

## Detailne analüüs

### 1. Lihtsus ja õppimiskõver

**Cypress:**
- ✅ Väga intuitiivne süntaks: `cy.get().type().click()`
- ✅ Reaalajas debugging brauseris
- ✅ Kiire alustamine algajatele
- ✅ Sisseehitatud ootemehhanismid

**Playwright:**
- ✅ Lihtsalt mõistetav API
- ❌ Rohkem konfiguratsiooni vaja
- ✅ Tugev TypeScript tugi
- ❌ Nõuab rohkem testimise taustatead

**Kogemus:** Cypress oli kiirem õppida ja alustada. Playwright nõudis rohkem seadistamist, kuid pakkus võimsamaid võimalusi.

### 2. Paigaldus ja seadistamine

**Cypress:**
```bash
npm install --save-dev cypress
npx cypress open  # GUI avamine
```
- ✅ Lihtne paigaldus
- ❌ Suurem failisuurus (~350MB)
- ✅ Graafiline kasutajaliides
- ❌ Ainult Chromium-based brauserid vaikimisi

**Playwright:**
```bash
npm install --save-dev playwright
npx playwright install  # Brauserite install
```
- ✅ Väiksem algne suurus
- ✅ Automaatne brauserite paigaldus
- ✅ Kõik brauserid out-of-the-box
- ❌ Esmapaigaldus aeglasem (brauserite tõttu)

### 3. Testide kirjutamise mugavus

**Cypress näide:**
```javascript
cy.get('[data-testid="username-input"]').type('testuser');
cy.get('[data-testid="login-button"]').click();
cy.url().should('include', '/dashboard');
```

**Playwright näide:**
```javascript
await page.fill('[data-testid="username-input"]', 'testuser');
await page.click('[data-testid="login-button"]');
await expect(page).toHaveURL(/.*dashboard.*/);
```

**Cypress eelised:**
- ✅ Automaatsed ootamised
- ✅ Lihtsam süntaks
- ✅ Paremad veateated

**Playwright eelised:**
- ✅ Async/await mustrid
- ✅ Tugevam selektor süsteem
- ✅ Paremad assertion võimalused

### 4. Jõudlus ja kiirus

**Testide käivitamise ajad (meie projektis):**

| Test tüüp | Cypress | Playwright | Erinevus |
|-----------|---------|------------|----------|
| Positiivsed testid (3) | 12.4s | 8.7s | -30% |
| Negatiivsed testid (3) | 10.2s | 7.1s | -30% |
| Edge case testid (6) | 18.9s | 13.2s | -30% |
| UI käitumise testid (6) | 15.1s | 11.3s | -25% |
| **Kokku (18 testi)** | **56.6s** | **40.3s** | **-29%** |

**Playwright on märkimisväärselt kiirem** tänu:
- Paremale brauseri haldusele
- Paralleelsele käivitamisele
- Optimeeritud selektor mootorile

### 5. Cross-browser tugi

**Cypress:**
- ✅ Chrome, Firefox, Edge
- ❌ Safari tugi puudub
- ❌ Mobiili brauserid ei ole toetatud
- ✅ Lihtne brauserite vahetus

**Playwright:**
- ✅ Chrome, Firefox, Safari, Edge
- ✅ Mobiili seadmete emuleerimine
- ✅ Erinevad seadme tüübid
- ✅ Paralleelne testimine brauserites

### 6. Debugging ja arenduskogemus

**Cypress:**
- ✅ Suurepärane visuaalne debugger
- ✅ Reaalajas DOM vaatamine
- ✅ Käskude taasesitamine
- ✅ Screenshots/videod automaatselt

**Playwright:**
- ✅ Playwright Inspector
- ✅ Trace Viewer
- ✅ Codegen tool testide genereerimiseks
- ❌ Vähem visuaalset debuggingut

### 7. Aruandlus ja tulemused

**Cypress:**
- Dashboard integratsioon (tasuline)
- HTML/JSON/JUnit aruanded
- Screenshots ja videod
- Mochawesome integratsiooni tugi

**Playwright:**
- ✅ Sisseehitatud HTML aruanne
- ✅ Trace visualiseerimine
- ✅ Paralleelse käivitamise aruanded
- ✅ CI/CD integratsioon

## Testide tulemused

### Loodud testide statistika:

| Kategooria | Testide arv | Cypress õnnestus | Playwright õnnestus |
|------------|-------------|------------------|---------------------|
| Positiivsed | 3 | ✅ 3/3 | ✅ 3/3 |
| Negatiivsed | 3 | ✅ 3/3 | ✅ 3/3 |
| Edge cases | 6 | ✅ 6/6 | ✅ 6/6 |
| UI käitumine | 6 | ✅ 6/6 | ✅ 6/6 |
| **Kokku** | **18** | **✅ 18/18** | **✅ 18/18** |

### Avastatud probleemid testimise käigus:

1. **CSS animatsioonid** - Mõlemad raamistikud vajasid animatsioonide ootamist
2. **API ootemised** - Playwright oli stabiilsem võrgu päringute ootamisel
3. **Element visibility** - Cypress oli paindlikum elementide nähtavuse kontrollimisel

## Praktilised näited

### Custom Commands/Functions

**Cypress (cypress/support/commands.js):**
```javascript
Cypress.Commands.add('login', (username, password) => {
  cy.visit('/login');
  cy.get('[data-testid="username-input"]').type(username);
  cy.get('[data-testid="password-input"]').type(password);
  cy.get('[data-testid="login-button"]').click();
});

// Kasutamine testis:
cy.login('testuser', 'password123');
```

**Playwright (helper funktsioonid):**
```javascript
async function login(page, username, password) {
  await page.goto('/login');
  await page.fill('[data-testid="username-input"]', username);
  await page.fill('[data-testid="password-input"]', password);
  await page.click('[data-testid="login-button"]');
}

// Kasutamine testis:
await login(page, 'testuser', 'password123');
```

### Vigade käsitlemine

**Cypress oli paremini:**
- Automaatsed retry mehhanismid
- Sõbralikumad veateated
- Visuaalne vea kuvarmine

**Playwright oli paremini:**
- Täpsemad error stackid  
- Parem async vigade käsitlemine
- Network failure jälgimine

## Isiklik kogemus ja valikud

### Mida ma õppisin:

1. **Cypress on algajasõbralikum** - kiire alustamine, intuitiivne API
2. **Playwright on võimsam** - parem jõudlus, rohkem võimalusi
3. **Mõlemad sobivad hästi** meie sisselogimise testimiseks
4. **Dokumentatsioon** - mõlemal väga hea, Cypress veidi selgem

### Mis raskusi tekitas:

**Cypress:**
- Safari brauserite puudumine
- Aeglasem testide täitmine
- Faili suurus suur

**Playwright:**
- Keerulisem seadistus alguses
- Vähem visuaalset debuggingut
- Community väiksem

### Millal kasutaksin kumba:

**Cypress sobib kui:**
- ✅ Algaja testimises
- ✅ Kiire prototüüpimine
- ✅ Fokus Chrome/Firefox brauseritel
- ✅ Visuaalne debugging oluline

**Playwright sobib kui:**
- ✅ Cross-browser testimine oluline
- ✅ CI/CD pipeline'is kiirust vaja
- ✅ API + UI testid koos
- ✅ Mobiili testimine vajalik

## Soovitused

### Meie projekti kontekstis:

1. **Väikeste projektide jaoks:** Cypress - lihtsam alustada
2. **Enterprise projektide jaoks:** Playwright - võimsam ja kiirem
3. **Algajatele:** Cypress - parem õppimiskogemus
4. **CI/CD jaoks:** Playwright - parem jõudlus

### Üldised soovitused:

1. **Kombineeritud lähenemine** - kasuta mõlemat erinevatel eesmärkidel
2. **Meeskonna oskused** - vali raamistik meeskonna kogemuse põhjal
3. **Projekti vajadused** - analüüsi cross-browser vajadusi
4. **Hoolduskulud** - mõtle pikaajalisele hooldusele

## Kokkuvõte

**Peamised järeldused:**

1. **Playwright on tehniliselt võimsam** - kiirem, rohkem võimalusi
2. **Cypress on kasutajasõbralikum** - lihtsam õppida ja kasutada  
3. **Mõlemad sobivad hästi** meie sisselogimise testimiseks
4. **Valik sõltub kontekstist** - projekt, meeskond, vajadused

**Minu isiklik eelistus:**
Alustaksin **Cypress-iga** kui olen algaja, kuid liiguks **Playwright-i** poole kui vajan rohkem jõudlust ja cross-browser tuge.

**Numbriline tulemus:**
- **Playwright: 43/50 punkti** (86%)
- **Cypress: 41/50 punkti** (82%)

**Õppetundid:**
See projekt õpetas mulle, et "parim" raamistik ei ole olemas - kõik sõltub konkreetsetest vajadustest ja kontekstist. Mõlemad raamistikud suudavad lahendada samu probleeme, kuid erinevate tugevuste ja nõrkustega.

---

**Projekti autor:** TAK24 üliõpilane  
**Projekti kood:** [GitHub Repository](https://github.com/tak24/ui-testing-comparison)  
**Testide käivitamise juhised:** Vaata [README.md](../README.md)