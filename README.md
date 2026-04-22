# ATP-Aliaksandr

Playwright automation project for Automation Training Platform (ATP)

## 🎯 Project Goals
- **API Testing** - Test ATP API endpoints (User Management, Employee Management, Form APIs)
- **UI Testing** - Automation Practice page elements (forms, tables, drag & drop, alerts, modals)
- **JavaScript Tasks** - Solutions for JS coding challenges

## 🏗️ Project Structure

```
ATP-Aliaksandr/
├── tests/
│   ├── api/           # API tests using Playwright Request API
│   └── ui/            # UI tests using Playwright Browser automation
├── page-objects/      # Page Object Model files
├── utils/             # Helper functions and test data
├── js-tasks/          # JavaScript challenge solutions
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

## 🧪 Running Tests

### Run all tests
```bash
npm test
```

### Run API tests only
```bash
npm run test:api
```

### Run UI tests only
```bash
npm run test:ui
```

### Run tests in headed mode
```bash
npm run test:headed
```

### Debug tests
```bash
npm run test:debug
```

### View test report
```bash
npm run report
```

### Generate test code with Codegen
```bash
npm run codegen
```

## 📝 Test Coverage

### API Tests (`tests/api/`)
- User Management CRUD operations
- Employee Management CRUD operations
- Form submission and retrieval
- Status code testing

### UI Tests (`tests/ui/`)
- Basic element interactions
- Form submissions
- Dynamic content manipulation
- Alert and modal handling
- Drag and drop operations
- Table interactions

## 🔧 Configuration

- **Base URL**: `http://136.243.9.168:5175`
- **Browsers**: Chromium, Firefox, WebKit
- **Reports**: HTML reports in `playwright-report/`
- **Screenshots**: Captured on failure

## 📚 JavaScript Tasks

Located in `js-tasks/` folder. Each file contains:
- Problem description
- Solution implementation
- Test cases

Run with:
```bash
npx ts-node js-tasks/task-name.ts
```

## 🛠️ Development

### Page Objects
Page objects are located in `page-objects/` and follow the Page Object Model pattern:
- `base-page.ts` - Base page with common methods
- `automation-practice-page.ts` - Main automation practice page
- `api-docs-page.ts` - API documentation page

### Utilities
Helper functions are in `utils/`:
- `helpers.ts` - Common utility functions
- `test-data.ts` - Test data and constants

## 📊 CI/CD

Tests are configured to run in CI with:
- Retry on failure: 2 attempts
- Single worker for consistency
- HTML report generation

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