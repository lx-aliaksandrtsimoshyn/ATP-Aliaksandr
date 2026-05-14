//////////////////////////////// Core Concepts //////////////////////////////
// Identify Data Types
// Write a function that returns the type of each value in an array.
function identifyTypes(arr) {
  return arr.map((value) => typeof value)
}
console.log(identifyTypes([1, 'hello', true, null, undefined, Symbol(), BigInt(10), {}]));

// Type Coercion Comparison
// Write a function that compares two values using both == and ===.
function compareValues(a, b) {
  return {
    doubleEquals: a == b,
    tripleEquals: a === b,
  }
}
console.log(compareValues('5', 5))
console.log(compareValues(0, false))

// Primitive vs. Object
// Write a function that checks if a value is a primitive or an object.
function isPrimitive(value) {
  return value === null || (typeof value !== 'object' && typeof value !== 'function')
}
console.log(isPrimitive(5)) // true
console.log(isPrimitive({})) // false

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////// Scope //////////////////////////////
// Identify Variable Scope
// Demonstrate global, function, and block scope using var, let, and const.

var globalVar = 'I am global';

function scopeDemo() {
  var functionVar = 'I am function scoped';
  if (true) {
    var functionVar2 = 'Still function scoped';
    let blockLet = 'I am block scoped';
    const blockConst = 'I am also block scoped';
    console.log(blockLet, blockConst);
  }
  console.log(functionVar, functionVar2);
  // console.log(blockLet); // Causes error
}

scopeDemo();
console.log(globalVar);

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////// Closures //////////////////////////////
// Basic Closure Example
// Write a function that returns another function which remembers a value from its outer scope.
function makeCounter() {
  let count = 0
  return function() {
    count++
    return count
  }
}
const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2

// Closure with Parameters
// Write a function that returns another function which adds a fixed value to its argument.
function addBy(x) {
  return function(y) {
    return x + y
  }
}
const add5 = addBy(5);
console.log(add5(10)); // 15
const add10 = addBy(10);
console.log(add10(10)); // 20

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////// Hoisting //////////////////////////////