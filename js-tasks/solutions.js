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
// Variable Hoisting Example
// Demonstrate how variable hoisting works. What will be logged and why?
console.log(a); // undefined
var a = 5;
console.log(a); // 5
// Try with let:
console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 10;

// Function Hoisting Example
// Show how function declarations and function expressions are hoisted differently.
foo(); // Function declaration hoisted!
function foo() {
  console.log('Function declaration hoisted!');
}

bar(); // TypeError: bar is not a function
var bar = function() {
  console.log('Function expression NOT hoisted!');
};

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////// this //////////////////////////////
// Understanding `this` in Different Contexts
// Explore how this behaves in various contexts: global scope, as an object method, in a constructor, and with call, apply, and bind.
console.log('Global:', this); // In browser, refers to window

function regularFunc() {
  console.log('Regular function:', this);
}
regularFunc(); // In non-strict mode: window; in strict mode: undefined

const obj = {
  method: function() {
    console.log('Object method:', this);
  },
  arrow: () => {
    console.log('Arrow method:', this);
  }
};
obj.method(); // obj
obj.arrow(); // window (or undefined in strict mode)

function Constructor() {
  this.value = 42;
  console.log('Constructor:', this);
}
new Constructor(); // instance of Constructor

function show() {
  console.log('call/apply/bind:', this);
}
show.call({a: 1}); // {a: 1}
show.apply({b: 2}); // {b: 2}
const bound = show.bind({c: 3});
bound(); // {c: 3}

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////// ES6+ Features //////////////////////////////
// Arrow Functions
// Arrow functions provide a shorter syntax for writing functions and do not have their own this.
const add = (a, b) => a + b;
console.log(add(2, 3)); // should return 5

// let and const
// let and const are block-scoped variable declarations. const cannot be reassigned.
let x = 5;
const y = 10;
x = 15; // valid
// y = 20; // invalid, const cannot be reassigned
console.log(x, y);

// Template Literals
// Template literals use backticks and ${} for string interpolation. Create a function that uses template literals.
function createMessage(name, age) {
  return `Hello, my name is ${name} and I am ${age} years old.`;
}
console.log(createMessage('Alice', 25));

// Spread Operator (ES6+)
// The spread operator (...) expands arrays or objects into individual elements. Create a function that uses spread to merge arrays.
