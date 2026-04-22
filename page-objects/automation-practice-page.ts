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
  readonly dynamicList: Locator;

  // Challenging Locators - Table
  readonly challengingTable: Locator;
  readonly editButtons: Locator;

  // Advanced Table
  readonly advancedTable: Locator;
  readonly staticDataCheckbox: Locator;
  readonly nameColumnCheckbox: Locator;
  readonly departmentColumnCheckbox: Locator;

  // Alerts and Modals
  readonly showAlertButton: Locator;
  readonly showConfirmButton: Locator;
  readonly showModalButton: Locator;

  constructor(page: Page) {
    super(page);
    
    // Basic Elements - verified with accessibility snapshot
    this.simpleButton = page.getByRole('button', { name: 'Simple Button' });
    this.secondaryButton = page.getByRole('button', { name: 'Secondary Button' });
    this.testLink = page.getByRole('link', { name: 'Test Link' });

    // Create New User Form - using placeholder selectors from snapshot
    this.userNameInput = page.getByPlaceholder('Enter name');
    this.userEmailInput = page.getByPlaceholder('Enter email');
    this.userPasswordInput = page.getByPlaceholder('Enter password');
    this.createUserButton = page.getByRole('button', { name: 'Create User' });
    this.resetFormButton = page.getByRole('button', { name: 'Reset Form' });

    // Dynamic Content - verified selectors
    this.addItemButton = page.getByRole('button', { name: 'Add Item' });
    this.removeItemButton = page.getByRole('button', { name: 'Remove Item' });
    this.dynamicList = page.locator('ul, ol').filter({ hasText: 'Static Item 1' });

    // Challenging Locators - Table with Name/Age/City
    this.challengingTable = page.getByRole('table').first();
    this.editButtons = page.getByRole('button', { name: 'Edit' });

    // Advanced Table - Data source and column visibility
    this.advancedTable = page.getByRole('heading', { name: 'Locator Practice - Advanced Table' }).locator('..');
    this.staticDataCheckbox = page.getByRole('checkbox', { name: '📊 Using Static Practice Data' });
    this.nameColumnCheckbox = page.getByRole('checkbox', { name: 'Name' }).first();
    this.departmentColumnCheckbox = page.getByRole('checkbox', { name: 'Department' });

    // Alerts and Modals - to be verified on page scroll
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

  async getTableRowCount(): Promise<number> {
    return await this.challengingTable.locator('tbody tr').count();
  }

  async clickEditButtonForRow(rowIndex: number) {
    await this.editButtons.nth(rowIndex).click();
  }

  async toggleStaticDataSource() {
    await this.staticDataCheckbox.click();
  }

  async toggleColumnVisibility(columnName: 'Name' | 'Department') {
    if (columnName === 'Name') {
      await this.nameColumnCheckbox.click();
    } else {
      await this.departmentColumnCheckbox.click();
    }
  }

  async getDynamicListItems(): Promise<string[]> {
    const items = await this.dynamicList.locator('li').allTextContents();
    return items;
  }
}
