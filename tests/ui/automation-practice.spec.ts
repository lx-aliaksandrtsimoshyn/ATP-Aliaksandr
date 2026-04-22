import { test, expect } from '@playwright/test';
import { AutomationPracticePage } from '../../page-objects/automation-practice-page';

test.describe('Automation Practice - Basic Elements', () => {
  let practicePage: AutomationPracticePage;

  test.beforeEach(async ({ page }) => {
    practicePage = new AutomationPracticePage(page);
    await practicePage.navigateToHomePage();
  });

  test('should load the automation practice page', async ({ page }) => {
    await expect(page).toHaveTitle(/ATP/i);
  });

  test('should interact with simple button', async () => {
    await expect(practicePage.simpleButton).toBeVisible();
    await practicePage.simpleButton.click();
  });

  test('should interact with test link', async () => {
    await expect(practicePage.testLink).toBeVisible();
    // await practicePage.testLink.click(); // Uncomment when ready to navigate
  });
});

test.describe('Automation Practice - User Form', () => {
  let practicePage: AutomationPracticePage;

  test.beforeEach(async ({ page }) => {
    practicePage = new AutomationPracticePage(page);
    await practicePage.navigateToHomePage();
  });

  test('should create a new user', async () => {
    const timestamp = Date.now();
    await practicePage.createUser(
      `Test User ${timestamp}`,
      `testuser${timestamp}@example.com`,
      'TestPassword123!'
    );
    
    // Add assertions based on expected behavior
    // await expect(practicePage.page.locator('.success-message')).toBeVisible();
  });

  test('should reset the user form', async () => {
    await practicePage.userNameInput.fill('Test Name');
    await practicePage.resetFormButton.click();
    
    await expect(practicePage.userNameInput).toHaveValue('');
  });
});

test.describe('Automation Practice - Dynamic Content', () => {
  let practicePage: AutomationPracticePage;

  test.beforeEach(async ({ page }) => {
    practicePage = new AutomationPracticePage(page);
    await practicePage.navigateToHomePage();
  });

  test('should add dynamic item', async ({ page }) => {
    await practicePage.clickAddItem();
    // Add assertion to verify item was added
  });

  test('should remove dynamic item', async ({ page }) => {
    await practicePage.clickRemoveItem();
    // Add assertion to verify item was removed
  });
});

test.describe('Automation Practice - Alerts', () => {
  let practicePage: AutomationPracticePage;

  test.beforeEach(async ({ page }) => {
    practicePage = new AutomationPracticePage(page);
    await practicePage.navigateToHomePage();
  });

  test('should handle alert dialog', async () => {
    await practicePage.handleAlert();
  });
});
