import { test, expect } from '../../utils/fixtures';
import { ApiDocsPage } from '../../page-objects/api-docs-page';

test.describe('API Docs Page', () => {
  
  test('should navigate to API docs and click Get All Users button', async ({ authenticatedPage }) => {
    // Navigate to API docs page
    await authenticatedPage.goto('/api-docs');
    
    // Verify page loaded
    await expect(authenticatedPage).toHaveTitle('ATP');
    
    // Wait for page content to be ready
    await authenticatedPage.waitForLoadState('networkidle');
    
    // Create page object
    const apiDocsPage = new ApiDocsPage(authenticatedPage);
    
    // Wait for the "Get All Users" heading to be visible
    const getAllUsersHeading = authenticatedPage.getByRole('heading', { name: /Get All Users/i });
    await getAllUsersHeading.waitFor({ state: 'visible', timeout: 10000 });
    
    // Scroll to the element
    await getAllUsersHeading.scrollIntoViewIfNeeded();
    
    // Click the Send Request button near "Get All Users" heading
    const sendButton = authenticatedPage.getByRole('button', { name: /send/i }).first();
    await sendButton.waitFor({ state: 'visible' });
    
    // Listen for API response
    const responsePromise = authenticatedPage.waitForResponse(
      response => response.url().includes('/api/users') && response.request().method() === 'GET'
    );
    
    await sendButton.click();
    
    // Wait for the API response
    const response = await responsePromise;
    
    // Verify the response was successful
    expect(response.status()).toBe(200);
    
    // Verify response body contains users array
    const responseBody = await response.json();
    expect(Array.isArray(responseBody)).toBeTruthy();
    expect(responseBody.length).toBeGreaterThan(0);
    
    // Wait for UI to display the response
    await authenticatedPage.waitForTimeout(500);
    
    // Verify response is displayed on the page (check for JSON or response container)
    const responseDisplay = authenticatedPage.locator('text=/200|users|id|email/i').first();
    await expect(responseDisplay).toBeVisible({ timeout: 5000 });
    
    // Take a screenshot to verify
    await authenticatedPage.screenshot({ path: 'api-docs-get-users.png' });
  });
  
});
