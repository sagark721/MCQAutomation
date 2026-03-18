# MCQ Markets Automation Framework

A Playwright-based end-to-end test automation framework for MCQ Markets, supporting multiple environments, browsers, and test suites.

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| [Playwright](https://playwright.dev) | ^1.58 | Browser automation & test runner |
| TypeScript | via `@types/node` | Type-safe test authoring |
| dotenv | ^17 | Environment variable management |
| Node.js | 20+ | Runtime |

---

## Project Structure

```
MCQAutomation2026/
├── .auth/                  # Saved authentication state files (auto-generated)
├── .github/workflows/      # GitHub Actions CI pipeline
├── src/
│   ├── components/         # Reusable UI components/helpers
│   ├── data/env/           # Environment variable files (.env.v3, .env.local)
│   ├── fixtures/           # Custom Playwright fixtures
│   ├── pages/              # Page Object Model (POM) classes
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Utility/helper functions
├── tests/
│   ├── api/                # API tests
│   ├── e2e/                # End-to-end tests
│   ├── functional/         # Functional tests
│   └── setup/              # Authentication setup (auth.setup.ts)
├── .env.example            # Template for required environment variables
├── playwright.config.ts    # Playwright configuration
└── package.json
```

---

## Getting Started

### 1. Prerequisites

- [Node.js 20+](https://nodejs.org/) installed
- npm (comes with Node.js)

### 2. Install Dependencies

```bash
npm install
```

### 3. Install Playwright Browsers

```bash
npx playwright install
```

### 4. Configure Environment Variables

Copy `.env.example` and create your local env file:

```bash
copy .env.example src\data\env\.env.local
```

Fill in the actual values:

```
BASE_URL=https://your-environment-url.com

CAN_INDIVIDUAL_EMAIL=your_email
CAN_INDIVIDUAL_PASSWORD=your_password

IND_TRUST_EMAIL=your_email
IND_TRUST_PASSWORD=your_password

US_COMPANY_EMAIL=your_email
US_COMPANY_PASSWORD=your_password
```

> ⚠️ Never commit `.env.local` or real credentials to git. It is already listed in `.gitignore`.

---

## Running Tests

### Run all tests (default environment: v3)

```bash
npx playwright test
```

### Run against a specific environment

```bash
TEST_ENV=v3 npx playwright test
```

### Run a specific test suite

```bash
npx playwright test tests/functional/
npx playwright test tests/api/
npx playwright test tests/e2e/
```

### Run with a specific browser

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Open the HTML report after a run

```bash
npx playwright show-report test-results/html
```

---

## Environments

The framework supports multiple environments controlled by the `TEST_ENV` variable:

| Value | Description |
|---|---|
| `v3` | Version 3 environment (default) |
| `v4` | Version 4 environment |

Environment files live in `src/data/env/` and follow the naming convention `.env.<environment>` (e.g. `.env.v3`).

---

## CI / GitHub Actions

The pipeline is defined in [.github/workflows/pipeline.yml](.github/workflows/pipeline.yml) and is triggered manually via **workflow_dispatch**.

You can select:
- **Environment**: `v3` or `v4`
- **Test suite**: `regression`, `smoke`, `functional`, or `api`
- **Browser**: `chromium`, `webkit`, or `firefox`

Required GitHub Secrets that must be configured in the repository settings:

| Secret | Description |
|---|---|
| `BASE_URL` | Application base URL |
| `CAN_INDIVIDUAL_EMAIL` | Canadian individual account email |
| `CAN_INDIVIDUAL_PASSWORD` | Canadian individual account password |
| `IND_TRUST_EMAIL` | Individual trust account email |
| `IND_TRUST_PASSWORD` | Individual trust account password |
| `US_COMPANY_EMAIL` | US company account email |
| `US_COMPANY_PASSWORD` | US company account password |

---

## Artifacts

After each CI run, the following are uploaded as GitHub Actions artifacts (retained for 30 days):
- **HTML Report** — Visual test report with screenshots, videos, and traces
- **JUnit XML** — Machine-readable results for integrations
