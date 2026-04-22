import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';

export class ApiDocsPage extends BasePage {
  // Authentication
  readonly goToLoginButton: Locator;
  readonly authStatusSection: Locator;

  // User Management - GET All Users
  readonly getAllUsersSendButton: Locator;
  
  // User Management - GET User by ID
  readonly getUserByIdInput: Locator;
  readonly getUserByIdSendButton: Locator;
  
  // User Management - POST Create User
  readonly createUserNameInput: Locator;
  readonly createUserEmailInput: Locator;
  readonly createUserPasswordInput: Locator;
  readonly createUserRoleInput: Locator;
  readonly createUserSendButton: Locator;
  
  // User Management - PUT Update User
  readonly updateUserIdInput: Locator;
  readonly updateUserNameInput: Locator;
  readonly updateUserEmailInput: Locator;
  readonly updateUserRoleInput: Locator;
  readonly updateUserSendButton: Locator;
  
  // User Management - DELETE User
  readonly deleteUserIdInput: Locator;
  readonly deleteUserSendButton: Locator;

  // Employee Management - GET All Employees
  readonly getAllEmployeesSendButton: Locator;

  // Employee Management - GET Employee by ID
  readonly getEmployeeByIdInput: Locator;
  readonly getEmployeeByIdSendButton: Locator;

  // Employee Management - POST Create Employee
  readonly createEmployeeNameInput: Locator;
  readonly createEmployeeEmailInput: Locator;
  readonly createEmployeeDepartmentInput: Locator;
  readonly createEmployeePositionInput: Locator;
  readonly createEmployeeSalaryInput: Locator;
  readonly createEmployeeSendButton: Locator;

  // Employee Management - PUT Update Employee
  readonly updateEmployeeIdInput: Locator;
  readonly updateEmployeeNameInput: Locator;
  readonly updateEmployeeEmailInput: Locator;
  readonly updateEmployeeDepartmentInput: Locator;
  readonly updateEmployeePositionInput: Locator;
  readonly updateEmployeeSalaryInput: Locator;
  readonly updateEmployeeSendButton: Locator;

  // Employee Management - DELETE Employee
  readonly deleteEmployeeIdInput: Locator;
  readonly deleteEmployeeSendButton: Locator;

  // Form APIs - POST Submit Form
  readonly formUsernameInput: Locator;
  readonly formEmailInput: Locator;
  readonly formPasswordInput: Locator;
  readonly formCountryInput: Locator;
  readonly formGenderInput: Locator;
  readonly formNewsletterInput: Locator;
  readonly formCommentsInput: Locator;
  readonly submitFormSendButton: Locator;

  // Form APIs - GET Form Submissions
  readonly getFormSubmissionsSendButton: Locator;

  constructor(page: Page) {
    super(page);
    
    // Authentication - verified from snapshot
    this.goToLoginButton = page.getByRole('button', { name: 'Go to Login Page' });
    this.authStatusSection = page.getByRole('heading', { name: '🔐 Authentication Status' }).locator('..');

    // User Management - All sections verified from snapshot
    // GET All Users
    this.getAllUsersSendButton = page.getByRole('heading', { name: 'Get All Users' }).locator('..').getByRole('button', { name: 'Send Request' });
    
    // GET User by ID - the first textbox under "Get User by ID" heading
    this.getUserByIdInput = page.getByRole('heading', { name: 'Get User by ID' }).locator('..').getByRole('textbox').first();
    this.getUserByIdSendButton = page.getByRole('heading', { name: 'Get User by ID' }).locator('..').getByRole('button', { name: 'Send Request' });
    
    // POST Create User
    const createUserSection = page.getByRole('heading', { name: 'Create New User' }).locator('..');
    this.createUserNameInput = createUserSection.getByRole('textbox').nth(0);
    this.createUserEmailInput = createUserSection.getByRole('textbox').nth(1);
    this.createUserPasswordInput = createUserSection.getByRole('textbox').nth(2);
    this.createUserRoleInput = createUserSection.getByRole('textbox').nth(3);
    this.createUserSendButton = createUserSection.getByRole('button', { name: 'Send Request' });
    
    // PUT Update User
    const updateUserSection = page.getByRole('heading', { name: 'Update User' }).locator('..');
    this.updateUserIdInput = updateUserSection.getByRole('textbox').nth(0);
    this.updateUserNameInput = updateUserSection.getByRole('textbox').nth(1);
    this.updateUserEmailInput = updateUserSection.getByRole('textbox').nth(2);
    this.updateUserRoleInput = updateUserSection.getByRole('textbox').nth(3);
    this.updateUserSendButton = updateUserSection.getByRole('button', { name: 'Send Request' });
    
    // DELETE User
    const deleteUserSection = page.getByRole('heading', { name: 'Delete User' }).locator('..');
    this.deleteUserIdInput = deleteUserSection.getByRole('textbox');
    this.deleteUserSendButton = deleteUserSection.getByRole('button', { name: 'Send Request' });

    // Employee Management - verified from snapshot
    // GET All Employees
    this.getAllEmployeesSendButton = page.getByRole('heading', { name: 'Get All Employees' }).locator('..').getByRole('button', { name: 'Send Request' });

    // GET Employee by ID
    const getEmployeeSection = page.getByRole('heading', { name: 'Get Employee by ID' }).locator('..');
    this.getEmployeeByIdInput = getEmployeeSection.getByRole('textbox');
    this.getEmployeeByIdSendButton = getEmployeeSection.getByRole('button', { name: 'Send Request' });

    // POST Create Employee
    const createEmployeeSection = page.getByRole('heading', { name: 'Create New Employee' }).locator('..');
    this.createEmployeeNameInput = createEmployeeSection.getByRole('textbox').nth(0);
    this.createEmployeeEmailInput = createEmployeeSection.getByRole('textbox').nth(1);
    this.createEmployeeDepartmentInput = createEmployeeSection.getByRole('textbox').nth(2);
    this.createEmployeePositionInput = createEmployeeSection.getByRole('textbox').nth(3);
    this.createEmployeeSalaryInput = createEmployeeSection.getByRole('spinbutton');
    this.createEmployeeSendButton = createEmployeeSection.getByRole('button', { name: 'Send Request' });

    // PUT Update Employee
    const updateEmployeeSection = page.getByRole('heading', { name: 'Update Employee' }).locator('..');
    this.updateEmployeeIdInput = updateEmployeeSection.getByRole('textbox').nth(0);
    this.updateEmployeeNameInput = updateEmployeeSection.getByRole('textbox').nth(1);
    this.updateEmployeeEmailInput = updateEmployeeSection.getByRole('textbox').nth(2);
    this.updateEmployeeDepartmentInput = updateEmployeeSection.getByRole('textbox').nth(3);
    this.updateEmployeePositionInput = updateEmployeeSection.getByRole('textbox').nth(4);
    this.updateEmployeeSalaryInput = updateEmployeeSection.getByRole('spinbutton');
    this.updateEmployeeSendButton = updateEmployeeSection.getByRole('button', { name: 'Send Request' });

    // DELETE Employee
    const deleteEmployeeSection = page.getByRole('heading', { name: 'Delete Employee' }).locator('..');
    this.deleteEmployeeIdInput = deleteEmployeeSection.getByRole('textbox');
    this.deleteEmployeeSendButton = deleteEmployeeSection.getByRole('button', { name: 'Send Request' });

    // Form APIs - verified from snapshot
    // POST Submit Form
    const submitFormSection = page.getByRole('heading', { name: 'Submit Form' }).locator('..');
    this.formUsernameInput = submitFormSection.getByRole('textbox').nth(0);
    this.formEmailInput = submitFormSection.getByRole('textbox').nth(1);
    this.formPasswordInput = submitFormSection.getByRole('textbox').nth(2);
    this.formCountryInput = submitFormSection.getByRole('textbox').nth(3);
    this.formGenderInput = submitFormSection.getByRole('textbox').nth(4);
    this.formNewsletterInput = submitFormSection.getByRole('textbox').nth(5);
    this.formCommentsInput = submitFormSection.getByRole('textbox').nth(6);
    this.submitFormSendButton = submitFormSection.getByRole('button', { name: 'Send Request' });

    // GET Form Submissions
    this.getFormSubmissionsSendButton = page.getByRole('heading', { name: 'Get Form Submissions' }).locator('..').getByRole('button', { name: 'Send Request' });
  }

  async navigateToApiDocs() {
    await this.goto('/api-docs');
  }

  async isAuthenticated(): Promise<boolean> {
    const statusText = await this.authStatusSection.textContent();
    return !statusText?.includes('Not Authenticated');
  }

  // User Management Methods
  async getAllUsers() {
    await this.getAllUsersSendButton.click();
  }

  async getUserById(userId: string) {
    await this.getUserByIdInput.fill(userId);
    await this.getUserByIdSendButton.click();
  }

  async createUser(name: string, email: string, password: string, role: string) {
    await this.createUserNameInput.fill(name);
    await this.createUserEmailInput.fill(email);
    await this.createUserPasswordInput.fill(password);
    await this.createUserRoleInput.fill(role);
    await this.createUserSendButton.click();
  }

  async updateUser(userId: string, name: string, email: string, role: string) {
    await this.updateUserIdInput.fill(userId);
    await this.updateUserNameInput.fill(name);
    await this.updateUserEmailInput.fill(email);
    await this.updateUserRoleInput.fill(role);
    await this.updateUserSendButton.click();
  }

  async deleteUser(userId: string) {
    await this.deleteUserIdInput.fill(userId);
    await this.deleteUserSendButton.click();
  }

  // Employee Management Methods
  async getAllEmployees() {
    await this.getAllEmployeesSendButton.click();
  }

  async getEmployeeById(employeeId: string) {
    await this.getEmployeeByIdInput.fill(employeeId);
    await this.getEmployeeByIdSendButton.click();
  }

  async createEmployee(name: string, email: string, department: string, position: string, salary: string) {
    await this.createEmployeeNameInput.fill(name);
    await this.createEmployeeEmailInput.fill(email);
    await this.createEmployeeDepartmentInput.fill(department);
    await this.createEmployeePositionInput.fill(position);
    await this.createEmployeeSalaryInput.fill(salary);
    await this.createEmployeeSendButton.click();
  }

  async updateEmployee(
    employeeId: string,
    name: string,
    email: string,
    department: string,
    position: string,
    salary: string
  ) {
    await this.updateEmployeeIdInput.fill(employeeId);
    await this.updateEmployeeNameInput.fill(name);
    await this.updateEmployeeEmailInput.fill(email);
    await this.updateEmployeeDepartmentInput.fill(department);
    await this.updateEmployeePositionInput.fill(position);
    await this.updateEmployeeSalaryInput.fill(salary);
    await this.updateEmployeeSendButton.click();
  }

  async deleteEmployee(employeeId: string) {
    await this.deleteEmployeeIdInput.fill(employeeId);
    await this.deleteEmployeeSendButton.click();
  }

  // Form APIs Methods
  async submitForm(
    username: string,
    email: string,
    password: string,
    country: string,
    gender: string,
    newsletter: string,
    comments: string
  ) {
    await this.formUsernameInput.fill(username);
    await this.formEmailInput.fill(email);
    await this.formPasswordInput.fill(password);
    await this.formCountryInput.fill(country);
    await this.formGenderInput.fill(gender);
    await this.formNewsletterInput.fill(newsletter);
    await this.formCommentsInput.fill(comments);
    await this.submitFormSendButton.click();
  }

  async getFormSubmissions() {
    await this.getFormSubmissionsSendButton.click();
  }
}
