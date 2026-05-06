import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';

export class ApiDocsPage extends BasePage {
  readonly getAllUsersHeading: Locator;
  readonly getAllUsersSendButton: Locator;
  readonly successBadge: Locator;
  readonly errorBadge: Locator;

  constructor(page: Page) {
    super(page);
    
    // Get All Users section
    this.getAllUsersHeading = page.getByRole('heading', { name: /Get All Users/i });
    this.getAllUsersSendButton = page.getByRole('button', { name: /send/i }).first();
    
    // Response indicators (top-right corner popups)
    this.successBadge = page.locator('.status-message.success');
    this.errorBadge = page.locator('.status-message.error');
  }

  async clickGetAllUsers() {
    await this.getAllUsersHeading.waitFor({ state: 'visible', timeout: 10000 });
    await this.getAllUsersHeading.scrollIntoViewIfNeeded();
    await this.getAllUsersSendButton.waitFor({ state: 'visible' });
    await this.getAllUsersSendButton.click();
  }

  async verifySuccessBadge(expectedText: string = '200 Success') {
    await this.successBadge.waitFor({ state: 'visible', timeout: 5000 });
    return this.successBadge;
  }

  async verifyErrorBadge() {
    await this.errorBadge.waitFor({ state: 'visible', timeout: 5000 });
    return this.errorBadge;
  }
}
