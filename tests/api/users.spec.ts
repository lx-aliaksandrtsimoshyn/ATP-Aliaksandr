import { test, expect } from '../../utils/fixtures';

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
  
});
