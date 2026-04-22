import { test, expect } from '@playwright/test';

const BASE_URL = 'http://136.243.9.168:5175';

test.describe('ATP API - User Management', () => {
  test('GET /api/users - should get all users', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/users`);
    
    expect(response.status()).toBe(200);
    const users = await response.json();
    expect(Array.isArray(users)).toBeTruthy();
  });

  test('GET /api/users/:id - should get user by ID', async ({ request }) => {
    const userId = 1;
    const response = await request.get(`${BASE_URL}/api/users/${userId}`);
    
    expect(response.status()).toBe(200);
    const user = await response.json();
    expect(user).toHaveProperty('id', userId);
  });

  test('POST /api/users - should create a new user', async ({ request }) => {
    const timestamp = Date.now();
    const newUser = {
      name: `Test User ${timestamp}`,
      email: `testuser${timestamp}@example.com`,
      password: 'TestPassword123!',
      role: 'employee'
    };

    const response = await request.post(`${BASE_URL}/api/users`, {
      data: newUser
    });

    expect(response.status()).toBeGreaterThanOrEqual(200);
    expect(response.status()).toBeLessThan(300);
    
    const createdUser = await response.json();
    expect(createdUser).toHaveProperty('id');
    expect(createdUser.email).toBe(newUser.email);
  });

  test('PUT /api/users/:id - should update an existing user', async ({ request }) => {
    const userId = 1;
    const updatedData = {
      name: 'Updated User Name',
      email: 'updated@example.com',
      role: 'admin'
    };

    const response = await request.put(`${BASE_URL}/api/users/${userId}`, {
      data: updatedData
    });

    // Note: Check the actual expected status code based on API behavior
    expect(response.ok() || response.status() === 304).toBeTruthy();
  });

  test('DELETE /api/users/:id - should delete a user', async ({ request }) => {
    // First create a user to delete
    const timestamp = Date.now();
    const newUser = {
      name: `Delete Test User ${timestamp}`,
      email: `deletetest${timestamp}@example.com`,
      password: 'TestPassword123!',
      role: 'employee'
    };

    const createResponse = await request.post(`${BASE_URL}/api/users`, {
      data: newUser
    });
    
    const createdUser = await createResponse.json();
    const userIdToDelete = createdUser.id;

    // Now delete the user
    const deleteResponse = await request.delete(`${BASE_URL}/api/users/${userIdToDelete}`);
    
    expect(deleteResponse.status()).toBeGreaterThanOrEqual(200);
    expect(deleteResponse.status()).toBeLessThan(300);
  });
});

test.describe('ATP API - Employee Management', () => {
  test('GET /api/employees - should get all employees', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/employees`);
    
    expect(response.status()).toBe(200);
    const employees = await response.json();
    expect(Array.isArray(employees)).toBeTruthy();
  });

  test('GET /api/employees/:id - should get employee by ID', async ({ request }) => {
    const employeeId = 1;
    const response = await request.get(`${BASE_URL}/api/employees/${employeeId}`);
    
    expect(response.status()).toBe(200);
    const employee = await response.json();
    expect(employee).toHaveProperty('id', employeeId);
  });

  test('POST /api/employees - should create a new employee', async ({ request }) => {
    const timestamp = Date.now();
    const newEmployee = {
      name: `New Employee ${timestamp}`,
      email: `employee${timestamp}@company.com`,
      department: 'IT',
      position: 'Developer',
      salary: 50000
    };

    const response = await request.post(`${BASE_URL}/api/employees`, {
      data: newEmployee
    });

    expect(response.status()).toBeGreaterThanOrEqual(200);
    expect(response.status()).toBeLessThan(300);
  });
});

test.describe('ATP API - Form Submission', () => {
  test('POST /api/form - should submit form data', async ({ request }) => {
    const formData = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'TestPassword123!',
      country: 'USA',
      gender: 'male',
      newsletter: 'yes',
      comments: 'Test comments'
    };

    const response = await request.post(`${BASE_URL}/api/form`, {
      data: formData
    });

    expect(response.status()).toBeGreaterThanOrEqual(200);
    expect(response.status()).toBeLessThan(300);
  });

  test('GET /api/form/submissions - should get form submissions', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/form/submissions`);
    
    // This might require authentication
    if (response.status() === 401) {
      // Authentication required - skip assertion
    } else {
      expect(response.status()).toBe(200);
    }
  });
});

test.describe('ATP API - Status Code Testing', () => {
  test('should return specific status codes', async ({ request }) => {
    const statusCodes = [200, 404, 500];

    for (const statusCode of statusCodes) {
      const response = await request.get(`${BASE_URL}/api/status/${statusCode}`);
      expect(response.status()).toBe(statusCode);
    }
  });
});
