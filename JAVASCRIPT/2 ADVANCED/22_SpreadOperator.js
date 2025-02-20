// Spread Operator (...)

// The spread operator allows an iterable (such as an array or string) to be expanded in places where zero or more elements are expected. This can be useful for copying arrays, combining arrays, and spreading elements into function arguments.

// 1.  Copying Arrays:
const array1 = [1,2,3];
const array2 = [...array1];
console.log(array2);

// 2. Combining Arrays:
const combinedArray = [...array1, ...array2];
console.log(combinedArray);

// 3: Spreading Elements into Function Arguments:

function sum(a,b,c){
  return a+b+c;
}
const numbers = [1,2,3];
console.log(sum(...numbers));

// 4. Spreading Objects:
// You can also use the spread operator to spread the properties of an object into another object.

const obj1 = {a:1, b:2};
const obj2 = {c:3, d:4};
const combinedObj = {...obj1, ...obj2};
console.log(combinedObj);

// 5. Spread Operator with Strings:
// The spread operator can be used to spread the characters of a string into an array.

const str = "Hare Krsna";
const chars = [...str];
console.log(chars);

// 6. Merging Objects with Overrides
// You can use the spread operator to merge objects, and if you spread an object with properties that have the same key, the latter will override the former.

const defaultSettings = {
  theme: "light",
  showNotifications: true,
};

const userSettings = {
  theme: "dark",
};
console.log(defaultSettings, userSettings);
const settings = {...defaultSettings, ...userSettings};
console.log(settings);