# MCQ Markets Automation Framework

A Playwright-based end-to-end test automation framework for MCQ Markets, supporting multiple environments, browsers, and test suites.

---

## Tech Stack

| Tool | Version | Purpose |
|---|---|---|
| [Playwright](https://playwright.dev) | ^1.58 | Browser automation & test runner |
| TypeScript | via `@types/node` | Type-safe test authoring |
| dotenv | ^17 | Environment variable management |
| ESLint + eslint-plugin-playwright | ^8.57 | Linting for TS and Playwright tests |
| Prettier | ^3.8 | Code formatting |
| Husky | ^9.1 | Git hooks (pre-commit linting) |
| lint-staged | ^16.4 | Run linters on staged files only |
| cross-env | ^10.1 | Cross-platform environment variables |
| Node.js | 20+ | Runtime |

---

## Project Structure

```
MCQAutomation2026/
├── .auth/                  # Saved authentication state files (auto-generated, gitignored)
├── .github/workflows/      # GitHub Actions CI pipeline
├── data/
│   └── env/                # Environment variable files (e.g. .env.v3 — gitignored)
├── src/
│   ├── components/         # Reusable UI component helpers (Header, Sidebar, etc.)
│   ├── fixtures/           # Custom Playwright fixtures & page factory
│   ├── pages/              # Page Object Model (POM) classes
│   ├── types/              # TypeScript type definitions & env declarations
│   └── utils/              # Utility/helper functions (logger, retry, wait)
├── tests/
│   ├── api/                # API tests
│   ├── e2e/                # End-to-end tests
│   ├── functional/         # Functional tests
│   └── setup/              # Authentication setup (auth.setup.ts)
├── playwright.config.ts    # Playwright configuration
├── tsconfig.json           # TypeScript configuration
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

Environment files live in `data/env/` at the project root and follow the naming convention `.env.<environment>` (e.g. `data/env/.env.v3`). These files are gitignored — obtain them from your team or secrets manager.

Optionally create a `.env.local` at the project root to override any variables locally:

```
BASE_URL=https://your-environment-url.com

CAN_INDIVIDUAL_EMAIL=your_email
CAN_INDIVIDUAL_PASSWORD=your_password

IND_TRUST_EMAIL=your_email
IND_TRUST_PASSWORD=your_password

US_COMPANY_EMAIL=your_email
US_COMPANY_PASSWORD=your_password
```

> ⚠️ Never commit env files or real credentials to git. `data/env/.env.v3` and `.env.local` are already listed in `.gitignore`.

---

## Running Tests

All test commands use `cross-env` to set the environment correctly across platforms. The npm scripts are the recommended way to run tests.

### Run auth setup first (required before running tests)

```bash
npm run test:setup:v3
```

### Run all tests against v3 (headless)

```bash
npm run test:v3
```

### Run tests in headed Chromium (v3)

```bash
npm run test:desktop:v3
```

### Run tests on mobile (Android emulation, v3)

```bash
npm run test:mobile:v3
```

### Run a specific test file or folder

```bash
npx cross-env TEST_ENV=v3 npx playwright test tests/functional/
npx cross-env TEST_ENV=v3 npx playwright test tests/e2e/
```

### Open the HTML report after a run

```bash
npx playwright show-report playwright-report
```

---

## Linting & Formatting

Husky runs ESLint and Prettier automatically on staged `.ts` files at commit time via lint-staged.

To run manually:

```bash
# Check for lint errors
npm run lint

# Auto-fix lint errors and format
npm run lint:fix
```

---

## Environments

The active environment is controlled by the `TEST_ENV` variable:

| Value | Description |
|---|---|
| `v3` | Version 3 environment (default) |

The env file is loaded from `data/env/.env.<TEST_ENV>`, with `.env.local` at the root used as an optional local override (highest priority).

---

## CI / GitHub Actions

The pipeline is defined in [.github/workflows/pipeline.yml](.github/workflows/pipeline.yml) and is triggered manually via **workflow_dispatch**.

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
- **JUnit XML** — Machine-readable results at `test-results/junit/results.xml`
