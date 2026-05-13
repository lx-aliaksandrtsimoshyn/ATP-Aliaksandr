// Core Concepts

// Identify Data Types
// Write a function that returns the type of each value in an array.
function identifyTypes(arr) {
  return arr.map((value) => typeof value)
}
console.log(identifyTypes([1, 'hello', true, null, undefined, Symbol(), BigInt(10), {}]));

///////////////////////////////////////////////////////////////////////////////////////////