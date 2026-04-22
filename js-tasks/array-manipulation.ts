/**
 * JavaScript Task Example: Array Manipulation
 * 
 * Problem: Given an array of numbers, implement functions to:
 * 1. Find the sum of all elements
 * 2. Find the maximum value
 * 3. Filter even numbers
 * 4. Double each element
 */

// Solution 1: Sum of all elements
function sumArray(arr: number[]): number {
  return arr.reduce((sum, num) => sum + num, 0);
}

// Solution 2: Find maximum value
function findMax(arr: number[]): number {
  return Math.max(...arr);
}

// Solution 3: Filter even numbers
function filterEven(arr: number[]): number[] {
  return arr.filter(num => num % 2 === 0);
}

// Solution 4: Double each element
function doubleElements(arr: number[]): number[] {
  return arr.map(num => num * 2);
}

// Test cases
const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log('Test Array:', testArray);
console.log('Sum:', sumArray(testArray)); // Expected: 55
console.log('Max:', findMax(testArray)); // Expected: 10
console.log('Even numbers:', filterEven(testArray)); // Expected: [2, 4, 6, 8, 10]
console.log('Doubled:', doubleElements(testArray)); // Expected: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

// Export for testing
export { sumArray, findMax, filterEven, doubleElements };
