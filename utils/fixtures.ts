import { test as base, APIRequestContext, Page, BrowserContext } from '@playwright/test';
import { createAuthenticatedAPIContext, createAuthenticatedBrowserContext } from './auth';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const APP_BASE_URL = 'http://136.243.9.168:5175';

// Extend base test with custom fixtures
export const test = base.extend<{
  authenticatedRequest: APIRequestContext;
  authenticatedPage: Page;
  authenticatedContext: BrowserContext;
}>({
  // Fixture for authenticated API requests using Bearer token
  authenticatedRequest: async ({}, use) => {
    const apiContext = await createAuthenticatedAPIContext();
    await use(apiContext);
    await apiContext.dispose();
  },

  // Fixture for authenticated browser context
  authenticatedContext: async ({ browser }, use) => {
    const context = await createAuthenticatedBrowserContext(browser);
    await use(context);
    await context.close();
  },

  // Fixture for authenticated page (convenience wrapper)
  authenticatedPage: async ({ authenticatedContext }, use) => {
    const page = await authenticatedContext.newPage();
    await page.goto(APP_BASE_URL);
    await use(page);
    // Page cleanup handled by context cleanup
  },
});

export { expect } from '@playwright/test';
