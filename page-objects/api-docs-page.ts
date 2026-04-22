import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';

export class ApiDocsPage extends BasePage {
  // Authentication
  readonly loginPageLink: Locator;
  readonly authStatus: Locator;

  // User Management - GET All Users
  readonly getAllUsersButton: Locator;
  
  // User Management - GET User by ID
  readonly getUserIdInput: Locator;
  readonly getUserByIdButton: Locator;
  
  // User Management - POST Create User
  readonly createUserNameInput: Locator;
  readonly createUserEmailInput: Locator;
  readonly createUserPasswordInput: Locator;
  readonly createUserRoleSelect: Locator;
  readonly createUserButton: Locator;
  
  // User Management - PUT Update User
  readonly updateUserIdInput: Locator;
  readonly updateUserNameInput: Locator;
  readonly updateUserEmailInput: Locator;
  readonly updateUserRoleSelect: Locator;
  readonly updateUserButton: Locator;
  
  // User Management - DELETE User
  readonly deleteUserIdInput: Locator;
  readonly deleteUserButton: Locator;

  constructor(page: Page) {
    super(page);
    
    // Authentication
    this.loginPageLink = page.getByRole('link', { name: 'Go to Login Page' });
    this.authStatus = page.locator('text=Authentication Status').locator('..');

    // User Management locators - will be refined based on actual HTML
    this.getAllUsersButton = page.getByRole('button', { name: /Get All Users/i }).first();
    
    this.getUserIdInput = page.locator('input').filter({ hasText: /User ID/i }).first();
    this.getUserByIdButton = page.getByRole('button', { name: /Send Request/i }).nth(1);
    
    this.createUserNameInput = page.locator('input').filter({ hasText: /Name/i }).first();
    this.createUserEmailInput = page.locator('input').filter({ hasText: /Email/i }).first();
    this.createUserPasswordInput = page.locator('input[type="password"]').first();
    this.createUserRoleSelect = page.locator('select, input').filter({ hasText: /Role/i }).first();
    this.createUserButton = page.getByRole('button', { name: /Create.*User/i });
    
    this.updateUserIdInput = page.locator('input').filter({ hasText: /User ID/i }).nth(1);
    this.updateUserNameInput = page.locator('input').filter({ hasText: /Name/i }).nth(1);
    this.updateUserEmailInput = page.locator('input').filter({ hasText: /Email/i }).nth(1);
    this.updateUserRoleSelect = page.locator('select, input').filter({ hasText: /Role/i }).nth(1);
    this.updateUserButton = page.getByRole('button', { name: /Update.*User/i });
    
    this.deleteUserIdInput = page.locator('input').filter({ hasText: /User ID/i }).nth(2);
    this.deleteUserButton = page.getByRole('button', { name: /Delete.*User/i });
  }

  async navigateToApiDocs() {
    await this.goto('/api-docs');
  }

  async isAuthenticated(): Promise<boolean> {
    const statusText = await this.authStatus.textContent();
    return !statusText?.includes('Not Authenticated');
  }

  async getAllUsers() {
    await this.getAllUsersButton.click();
  }

  async getUserById(userId: string) {
    await this.getUserIdInput.fill(userId);
    await this.getUserByIdButton.click();
  }

  async createUser(name: string, email: string, password: string, role: string) {
    await this.createUserNameInput.fill(name);
    await this.createUserEmailInput.fill(email);
    await this.createUserPasswordInput.fill(password);
    await this.createUserRoleSelect.fill(role);
    await this.createUserButton.click();
  }

  async deleteUser(userId: string) {
    await this.deleteUserIdInput.fill(userId);
    await this.deleteUserButton.click();
  }
}
