/**
 * Utility functions for ATP tests
 */

/**
 * Generate a unique timestamp-based identifier
 */
export function generateTimestamp(): string {
  return Date.now().toString();
}

/**
 * Generate a unique email address
 */
export function generateEmail(prefix: string = 'test'): string {
  return `${prefix}${generateTimestamp()}@example.com`;
}

/**
 * Generate a random password
 */
export function generatePassword(length: number = 12): string {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  return password;
}

/**
 * Wait for a specified number of milliseconds
 */
export async function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Format date to ISO string
 */
export function formatDate(date: Date = new Date()): string {
  return date.toISOString();
}

/**
 * Generate random number within range
 */
export function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Retry an async function with exponential backoff
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  initialDelay: number = 1000
): Promise<T> {
  let lastError: Error;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (i < maxRetries - 1) {
        const delay = initialDelay * Math.pow(2, i);
        await wait(delay);
      }
    }
  }
  
  throw lastError!;
}
