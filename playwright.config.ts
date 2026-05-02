import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  timeout: 60000, // 60 seconds per test
  use: {
    baseURL: 'http://136.243.9.168:5175',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    actionTimeout: 15000, // 15 seconds for each action
    headless: false, // Use headed mode to avoid headless shell issues
  },

  projects: [
    // API tests - no browser, run once
    {
      name: 'api',
      testMatch: /tests\/api\/.*\.spec\.ts/,
    },

    // Web/UI tests - chromium only
    {
      name: 'web',
      testMatch: /tests\/web\/.*\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
