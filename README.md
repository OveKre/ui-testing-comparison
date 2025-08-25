# UI Testing Comparison: Cypress vs Playwright

[![Tests](https://github.com/OveKre/ui-testing-comparison/actions/workflows/tests.yml/badge.svg)](https://github.com/OveKre/ui-testing-comparison/actions/workflows/tests.yml)

Assignment for **TAK24** course: UI testing frameworks comparison (ÕV3, ÕV4).

## 📋 Project Description

This project compares two popular UI testing frameworks:
- **Cypress** - JavaScript-based E2E testing framework
- **Playwright** - Microsoft's modern cross-browser testing framework

Both frameworks implement equivalent tests for **login functionality** testing.

## 🏗️ Project Structure

```
ui-testing-comparison/
├── public/                        # Frontend files (HTML, CSS, JS)
│   ├── index.html                # Home page
│   ├── login.html                # Login form
│   ├── dashboard.html            # Dashboard (after login)
│   ├── style.css                 # Styles
│   └── script.js                 # Frontend JavaScript
├── server.js                     # Express.js server
├── package.json                  # Application dependencies
│
├── tests/                         # Tests directory
│   ├── cypress/                   # Cypress tests
│   │   ├── e2e/login.cy.js       # Login tests
│   │   ├── support/              # Support files and custom commands
│   │   └── cypress.config.js     # Cypress configuration
│   │
│   ├── playwright/               # Playwright tests
│   │   ├── tests/login.spec.js   # Login tests
│   │   ├── global-setup.js       # Global setup
│   │   ├── global-teardown.js    # Global teardown
│   │   └── playwright.config.js  # Playwright configuration
│   │
│   └── package.json              # Test dependencies
│
├── docs/
│   └── test-report.md            # Detailed framework comparison
│
├── README.md                     # This file
└── .gitignore                    # Git ignore rules
```

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/OveKre/ui-testing-comparison.git
cd ui-testing-comparison
```

### 2. Start Application

```bash
# Install dependencies
npm install

# Start application
npm start
```

Application runs at: http://localhost:3000

### 3. Prepare Tests

Open a new terminal window and:

```bash
# Navigate to tests directory
cd tests
npm install

# Install Playwright browsers (if using Playwright)
npx playwright install
```

## 🧪 Running Tests

### Cypress Tests

```bash
# Visual execution (GUI)
npm run cypress:open

# Command line execution
npm run cypress:run

# Headless mode
npm run cypress:run:headless
```

### Playwright Tests

```bash
# All tests
npm run playwright:test

# Tests with UI
npm run playwright:test:headed

# Debug mode
npm run playwright:test:debug

# View report
npm run playwright:report
```

### All Tests Together

```bash
# Run both Cypress and Playwright tests
npm run test:all
```

## 📊 Test Scenarios

Both frameworks implement the following tests:

### ✅ Positive Tests (3)
- Successful login with valid credentials
- Admin user login
- Dashboard functionality testing

### ❌ Negative Tests (3)
- Login with invalid credentials
- Invalid password testing
- Non-existent user login

### 🔄 Edge Case Tests (6)
- Empty fields validation
- Partial data testing
- Whitespace data handling
- Stress test (long data)
- XSS and injection protection test
- Keyboard navigation (Playwright only)

### 🎨 UI Behavior Tests (6)
- Form elements presence
- Navigation between pages
- Responsive behavior
- CSS animations control
- API request testing
- Network error handling

## 👤 Test Users

The application has the following test users:

| Username | Password | Role |
|----------|----------|------|
| `testuser` | `password123` | Regular User |
| `admin` | `admin123` | Administrator |
| `john` | `john123` | Regular User |

## 📈 Test Results

| Framework | Tests Count | Passed | Failed | Execution Time |
|-----------|-------------|--------|--------|----------------|
| Cypress | 18 | ✅ 18 | ❌ 0 | ~57 seconds |
| Playwright | 18 | ✅ 18 | ❌ 0 | ~40 seconds |

**Playwright is ~30% faster** thanks to better parallelism support and optimized browser management.

## 🔧 Configuration

### Cypress Configuration
- **Base URL:** http://localhost:3000
- **Viewport:** 1280x720
- **Timeout:** 10 seconds
- **Retry:** 2 times (run mode)
- **Video:** Enabled
- **Screenshots:** On failure

### Playwright Configuration
- **Base URL:** http://localhost:3000
- **Browsers:** Chrome, Firefox, Safari, Edge
- **Viewport:** 1280x720
- **Timeout:** 10 seconds (actions), 30 seconds (navigation)
- **Parallelism:** Full
- **Trace:** On first retry

## 📖 Documentation

Detailed comparison analysis with practical examples and recommendations: [docs/test-report.md](docs/test-report.md)

## 🔗 Useful Links

### Cypress
- [Cypress Documentation](https://docs.cypress.io/)
- [Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [API Reference](https://docs.cypress.io/api/table-of-contents)

### Playwright
- [Playwright Documentation](https://playwright.dev/)
- [Test Generator](https://playwright.dev/docs/codegen)
- [Trace Viewer](https://playwright.dev/docs/trace-viewer)

## 🐛 Troubleshooting

### Application Won't Start
```bash
# Check you're in the right directory
pwd

# Check Node.js version (should be v14+)
node --version

# Check port
netstat -an | grep 3000
```

### Cypress Tests Fail
```bash
# Clear cache
npx cypress cache clear

# Check browser availability
npx cypress verify
```

### Playwright Tests Fail
```bash
# Reinstall browsers
npx playwright install

# Check system dependencies
npx playwright install-deps
```

### Network Connection Issues
```bash
# Check application is running
curl http://localhost:3000

# Test CORS settings
curl -H "Origin: http://localhost:3000" http://localhost:3000/api/users
```

## 🤝 Development

### Adding New Tests

1. **Cypress tests:** Add file to `tests/cypress/e2e/` directory
2. **Playwright tests:** Add file to `tests/playwright/tests/` directory
3. **Use data-testid attributes** for element location
4. **Follow existing project structure**

### Code Style

```javascript
// Cypress
describe('Test Group', () => {
  it('specific test', () => {
    cy.get('[data-testid="element"]').should('be.visible');
  });
});

// Playwright  
test.describe('Test Group', () => {
  test('specific test', async ({ page }) => {
    await expect(page.locator('[data-testid="element"]')).toBeVisible();
  });
});
```

## 📝 License

This project was created for educational purposes as part of the TAK24 course.

## 👨‍💻 Author

**TAK24 Student**
- 📧 Email: [student@example.ee](mailto:student@example.ee)
- 📚 Course: TAK24
- 📅 Year: 2025

---

## 🎯 Summary

This project demonstrates practical usage and comparison of two popular UI testing frameworks. Both frameworks can successfully test web application login functionality, but differ in their strengths and weaknesses.

**Key Learnings:**
1. **Cypress** - beginner-friendly, excellent debugging
2. **Playwright** - faster, better cross-browser support
3. **Choice depends on needs** - project, team, requirements

Detailed analysis and recommendations are available in [test-report.md](docs/test-report.md).
