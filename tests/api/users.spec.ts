import { test, expect } from '../../utils/fixtures';
import { request } from '@playwright/test';

test.describe('Users API', () => {
  
  test('GET /api/users - should get all users with authentication', async ({ authenticatedRequest }) => {
    const response = await authenticatedRequest.get('/api/users');
    
    expect(response.status()).toBe(200);
    
    const users = await response.json();
    expect(Array.isArray(users)).toBeTruthy();
    expect(users.length).toBeGreaterThan(0);
    
    // Verify user structure
    const firstUser = users[0];
    expect(firstUser).toHaveProperty('id');
    expect(firstUser).toHaveProperty('name');
    expect(firstUser).toHaveProperty('email');
  });
  
  test('GET /api/users - should return 401 without authentication', async () => {
    const context = await request.newContext({
      baseURL: process.env.API_BASE_URL || 'http://136.243.9.168:3001',
    });
    
    const response = await context.get('/api/users');
    
    expect(response.status()).toBe(401);
    
    const body = await response.json();
    expect(body).toHaveProperty('error');
    expect(body.error).toBe('Access token required');
    
    await context.dispose();
  });
  
});
