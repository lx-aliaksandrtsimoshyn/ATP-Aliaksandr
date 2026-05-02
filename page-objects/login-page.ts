import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';

export class LoginPage extends BasePage {
  // Menu button to open login
  readonly menuButton: Locator;
  readonly loginMenuButton: Locator;

  // Login form fields (in modal/popup)
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginSubmitButton: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    super(page);
    
    // Burger menu button in top right
    this.menuButton = page.locator('button[aria-label="Menu"]');
    
    // Login button in menu (with lock icon)
    this.loginMenuButton = page.locator('button:has-text("🔐Login")');
    
    // Login form inputs (without name attribute, in modal)
    this.emailInput = page.locator('input[type="email"]').filter({ hasNot: page.locator('[name]') }).first();
    this.passwordInput = page.locator('input[type="password"]').filter({ hasNot: page.locator('[name]') }).first();
    
    // Login submit button
    this.loginSubmitButton = page.locator('button:has-text("Login")').last();
    
    // Logout button (if exists after login)
    this.logoutButton = page.locator('button:has-text("Logout"), button:has-text("Log out")');
  }

  async openLoginMenu() {
    await this.menuButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.menuButton.click();
    await this.page.waitForTimeout(500);
  }

  async clickLoginButton() {
    await this.loginMenuButton.waitFor({ state: 'visible', timeout: 5000 });
    await this.loginMenuButton.click();
    await this.page.waitForTimeout(1000);
  }

  async fillCredentials(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async submitLogin() {
    await this.loginSubmitButton.click();
    await this.page.waitForTimeout(1000);
  }

  async login(email: string, password: string) {
    await this.openLoginMenu();
    await this.clickLoginButton();
    await this.fillCredentials(email, password);
    await this.submitLogin();
  }

  async isLoggedIn(): Promise<boolean> {
    // Check if logout button is visible
    const logoutVisible = await this.logoutButton.isVisible().catch(() => false);
    
    // Or check if login button is NOT visible
    const loginNotVisible = !(await this.loginMenuButton.isVisible().catch(() => true));
    
    return logoutVisible || loginNotVisible;
  }

  async logout() {
    if (await this.isLoggedIn()) {
      await this.openLoginMenu();
      await this.logoutButton.click();
      await this.page.waitForTimeout(500);
    }
  }
}
