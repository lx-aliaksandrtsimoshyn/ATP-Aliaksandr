import { test, expect } from '../../utils/fixtures';
import { ApiDocsPage } from '../../page-objects/api-docs-page';

test.describe('API Docs Page', () => {
  
  test('should display success badge after clicking Get All Users button', async ({ authenticatedPage }) => {
    // Create page object
    const apiDocsPage = new ApiDocsPage(authenticatedPage);
    
    // Navigate to API docs page using page object method
    await apiDocsPage.goto('/api-docs');
    
    // Wait for page content to be ready using page object method
    await apiDocsPage.waitForPageLoad();
    
    // Click Get All Users button using page object
    await apiDocsPage.clickGetAllUsers();
    
    // Verify success badge appears with "200 Success" text using page object
    const successBadge = await apiDocsPage.verifySuccessBadge();
    await expect(successBadge).toContainText('GET request successful! (200)');
  });
  
  test('should display error badge when clicking Get All Users without authentication', async ({ page }) => {
    // Create page object with unauthenticated page
    const apiDocsPage = new ApiDocsPage(page);
    
    // Navigate to API docs page using page object method
    await apiDocsPage.goto('/api-docs');
    
    // Wait for page content to be ready using page object method
    await apiDocsPage.waitForPageLoad();
    
    // Click Get All Users button using page object
    await apiDocsPage.clickGetAllUsers();
    
    // Verify error badge appears (it's a temporary popup that quickly disappears)
    const errorBadge = await apiDocsPage.verifyErrorBadge();
    await expect(errorBadge).toContainText('Authentication required for this endpoint.');
  });
  
});
