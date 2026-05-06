# ATP-Aliaksandr

Playwright automation project for Automation Training Platform (ATP)

## 🎯 Project Goals
- **API Testing** - Test ATP API endpoints with authentication
- **Web Testing** - Automate API documentation page interactions and validations

## 🏗️ Project Structure

```
ATP-Aliaksandr/
├── tests/
│   ├── api/           # API tests using Playwright Request API
│   └── web/           # Web tests using Playwright Browser automation
├── page-objects/      # Page Object Model files
│   ├── base-page.ts   # Base page with common methods
│   └── api-docs-page.ts # API docs page object
├── utils/             # Authentication and fixtures
│   ├── auth.ts        # Authentication helpers (JWT token-based)
│   └── fixtures.ts    # Custom Playwright fixtures
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js v20+ (LTS recommended)
- npm 10+

### Installation

1. Clone the repository:
```bash
git clone https://github.com/lx-aliaksandrtsimoshyn/ATP-Aliaksandr.git
cd ATP-Aliaksandr
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

4. Create `.env` file with your credentials:
```env
BASE_URL=http://136.243.9.168:5175
API_BASE_URL=http://136.243.9.168:3001
TEST_USER_EMAIL=your.email@example.com
TEST_USER_PASSWORD=your_password
```

## 🧪 Running Tests

### Run all tests
```bash
npm test
```

### Run API tests only
```bash
npm run test:api
```

### Run Web tests only
```bash
npm run test:web
```

### Run tests in headed mode
```bash
npx playwright test --headed
```

### Debug tests
```bash
npx playwright test --debug
```

### View test report
```bash
npx playwright show-report
```

## 📝 Test Coverage

### API Tests (`tests/api/`)
- **GET /api/users** - Retrieve all users with authentication
  - Validates 200 status code
  - Verifies response structure (id, name, email)

### Web Tests (`tests/web/`)
- **API Docs Page** - API documentation interactions
  - Success popup validation (authenticated user clicks "Get All Users")
  - Error popup validation (unauthenticated user clicks "Get All Users")
  - Validates temporary notification popups in top-right corner

## 🔧 Configuration

- **Base URL**: `http://136.243.9.168:5175`
- **API Base URL**: `http://136.243.9.168:3001`
- **Browser**: Chromium (Desktop Chrome)
- **Authentication**: JWT token-based (via API)
- **Test Execution**: Sequential (1 worker)
- **Reports**: HTML reports in `playwright-report/`
- **Screenshots**: Captured on failure

## 🔐 Authentication

Tests use JWT token-based authentication:
- `authenticatedRequest` - API request context with Bearer token
- `authenticatedPage` - Browser page with token in localStorage
- `authenticatedContext` - Browser context with authentication

Tokens are obtained via `POST /api/login` and stored in localStorage for web tests.

## 🛠️ Development

### Page Object Model
Page objects follow the Page Object Model pattern for maintainable test code:

- **`base-page.ts`** - Base page class with common methods:
  - `goto(path)` - Navigate to a path
  - `waitForPageLoad()` - Wait for page to load
  - `screenshot(name)` - Take a screenshot

- **`api-docs-page.ts`** - API documentation page:
  - Locators: `getAllUsersHeading`, `getAllUsersSendButton`, `successBadge`, `errorBadge`
  - Methods: `clickGetAllUsers()`, `verifySuccessBadge()`, `verifyErrorBadge()`

### Custom Fixtures
Custom Playwright fixtures provide authenticated contexts:
- `authenticatedRequest` - APIRequestContext with Bearer token
- `authenticatedPage` - Page with authentication
- `authenticatedContext` - BrowserContext with authentication

## 📊 CI/CD

Tests are configured to run in CI with:
- Sequential execution (1 worker)
- HTML report generation
- Screenshots on failure

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run tests to ensure they pass
4. Commit and push
5. Create a pull request

## 📖 Resources

- [Playwright Documentation](https://playwright.dev)
- [ATP Platform](http://136.243.9.168:5175)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Playwright MCP Integration](https://github.com/microsoft/playwright/tree/main/utils/mcp)