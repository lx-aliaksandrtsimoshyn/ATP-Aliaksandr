import { request, APIRequestContext, Browser, BrowserContext, Page } from '@playwright/test';

const API_BASE_URL = 'http://136.243.9.168:3001';
const APP_BASE_URL = 'http://136.243.9.168:5175';

interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
    bug_mode_enabled: boolean;
  };
}

/**
 * Login via API and get authentication token
 * @param email - User email
 * @param password - User password
 * @returns Login response with token and user info
 */
export async function loginViaAPI(email: string, password: string): Promise<LoginResponse> {
  const apiContext = await request.newContext({
    baseURL: API_BASE_URL,
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
      'Origin': APP_BASE_URL,
      'Referer': APP_BASE_URL + '/',
    },
  });

  const response = await apiContext.post('/api/login', {
    data: { email, password },
  });

  if (!response.ok()) {
    await apiContext.dispose();
    throw new Error(`Login failed with status ${response.status()}: ${await response.text()}`);
  }

  const data = await response.json() as LoginResponse;
  await apiContext.dispose();

  if (!data.token) {
    throw new Error('Login response does not contain a token');
  }

  return data;
}

/**
 * Get authentication token
 * @param email - User email (defaults to TEST_USER_EMAIL from .env)
 * @param password - User password (defaults to TEST_USER_PASSWORD from .env)
 * @returns JWT token
 */
export async function getAuthToken(
  email?: string,
  password?: string
): Promise<string> {
  const userEmail = email || process.env.TEST_USER_EMAIL || '';
  const userPassword = password || process.env.TEST_USER_PASSWORD || '';

  if (!userEmail || !userPassword) {
    throw new Error('Email and password are required. Set TEST_USER_EMAIL and TEST_USER_PASSWORD in .env');
  }

  const loginData = await loginViaAPI(userEmail, userPassword);
  return loginData.token;
}

/**
 * Creates an authenticated API request context with Bearer token
 * @param token - Optional JWT token. If not provided, will login automatically
 * @param baseURL - Base URL for API requests (defaults to API_BASE_URL)
 * @returns Authenticated APIRequestContext
 */
export async function createAuthenticatedAPIContext(
  token?: string,
  baseURL: string = API_BASE_URL
): Promise<APIRequestContext> {
  // Get token if not provided
  const authToken = token || await getAuthToken();

  const context = await request.newContext({
    baseURL,
    extraHTTPHeaders: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json',
      'Origin': APP_BASE_URL,
      'Referer': APP_BASE_URL + '/',
    },
  });

  return context;
}

/**
 * Creates an authenticated browser context with token injected into localStorage
 * @param browser - Browser instance
 * @param token - Optional JWT token. If not provided, will login automatically
 * @returns Authenticated BrowserContext
 */
export async function createAuthenticatedBrowserContext(
  browser: Browser,
  token?: string
): Promise<BrowserContext> {
  // Get token if not provided
  const authToken = token || await getAuthToken();
  
  // Create browser context
  const context = await browser.newContext();
  
  // Add initialization script to inject token before page loads
  await context.addInitScript((token: string) => {
    // @ts-ignore - window is available in browser context
    window.localStorage.setItem('authToken', token);
    // @ts-ignore - window is available in browser context
    window.localStorage.setItem('token', token);
  }, authToken);
  
  return context;
}

/**
 * Creates an authenticated page with token already injected
 * @param browser - Browser instance
 * @param token - Optional JWT token. If not provided, will login automatically
 * @param url - Optional URL to navigate to (defaults to APP_BASE_URL)
 * @returns Authenticated Page
 */
export async function createAuthenticatedPage(
  browser: Browser,
  token?: string,
  url: string = APP_BASE_URL
): Promise<Page> {
  const context = await createAuthenticatedBrowserContext(browser, token);
  const page = await context.newPage();
  await page.goto(url);
  
  return page;
}
