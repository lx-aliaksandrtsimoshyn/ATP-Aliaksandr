import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';

export class AutomationPracticePage extends BasePage {
  // Basic Elements
  readonly simpleButton: Locator;
  readonly secondaryButton: Locator;
  readonly testLink: Locator;

  // Create New User Form
  readonly userNameInput: Locator;
  readonly userEmailInput: Locator;
  readonly userPasswordInput: Locator;
  readonly createUserButton: Locator;
  readonly resetFormButton: Locator;

  // Dynamic Content
  readonly addItemButton: Locator;
  readonly removeItemButton: Locator;

  // Alerts and Modals
  readonly showAlertButton: Locator;
  readonly showConfirmButton: Locator;
  readonly showModalButton: Locator;

  constructor(page: Page) {
    super(page);
    
    // Initialize locators - will be refined after inspecting actual page
    this.simpleButton = page.getByRole('button', { name: 'Simple Button' });
    this.secondaryButton = page.getByRole('button', { name: 'Secondary Button' });
    this.testLink = page.getByRole('link', { name: 'Test Link' });

    // Form elements
    this.userNameInput = page.locator('input[name="name"]').first();
    this.userEmailInput = page.locator('input[name="email"]').first();
    this.userPasswordInput = page.locator('input[type="password"]').first();
    this.createUserButton = page.getByRole('button', { name: 'Create User' });
    this.resetFormButton = page.getByRole('button', { name: 'Reset Form' });

    // Dynamic content
    this.addItemButton = page.getByRole('button', { name: 'Add Item' });
    this.removeItemButton = page.getByRole('button', { name: 'Remove Item' });

    // Alerts
    this.showAlertButton = page.getByRole('button', { name: 'Show Alert' });
    this.showConfirmButton = page.getByRole('button', { name: 'Show Confirm' });
    this.showModalButton = page.getByRole('button', { name: 'Show Modal' });
  }

  async navigateToHomePage() {
    await this.goto('/');
  }

  async createUser(name: string, email: string, password: string) {
    await this.userNameInput.fill(name);
    await this.userEmailInput.fill(email);
    await this.userPasswordInput.fill(password);
    await this.createUserButton.click();
  }

  async clickAddItem() {
    await this.addItemButton.click();
  }

  async clickRemoveItem() {
    await this.removeItemButton.click();
  }

  async handleAlert() {
    this.page.once('dialog', dialog => {
      console.log(`Alert message: ${dialog.message()}`);
      dialog.accept();
    });
    await this.showAlertButton.click();
  }
}
