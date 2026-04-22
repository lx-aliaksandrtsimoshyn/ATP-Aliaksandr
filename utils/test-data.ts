/**
 * Test data and constants for ATP tests
 */

export const ATP_CONFIG = {
  BASE_URL: 'http://136.243.9.168:5175',
  TIMEOUT: 30000,
  DEFAULT_WAIT: 1000,
};

export const ROUTES = {
  HOME: '/',
  API_DOCS: '/api-docs',
  JS_TASKS: '/js-tasks',
  FRAMEWORKS: '/frameworks',
};

export const API_ENDPOINTS = {
  USERS: '/api/users',
  EMPLOYEES: '/api/employees',
  FORM: '/api/form',
  FORM_SUBMISSIONS: '/api/form/submissions',
  STATUS: '/api/status',
};

export const TEST_USERS = {
  VALID_USER: {
    name: 'Test User',
    email: 'testuser@example.com',
    password: 'TestPassword123!',
    role: 'employee',
  },
  ADMIN_USER: {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'AdminPassword123!',
    role: 'admin',
  },
};

export const TEST_EMPLOYEE = {
  name: 'Test Employee',
  email: 'employee@company.com',
  department: 'IT',
  position: 'Developer',
  salary: 50000,
};

export const FORM_DATA = {
  username: 'testuser',
  email: 'test@example.com',
  password: 'TestPassword123!',
  country: 'USA',
  gender: 'male',
  newsletter: 'yes',
  comments: 'Test comments',
};

export const ERROR_MESSAGES = {
  AUTHENTICATION_REQUIRED: 'Authentication required',
  USER_NOT_FOUND: 'User not found',
  INVALID_INPUT: 'Invalid input',
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};
