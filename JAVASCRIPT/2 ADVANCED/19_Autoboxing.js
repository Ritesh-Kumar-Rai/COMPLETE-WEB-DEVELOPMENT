// Autoboxing means automatic conversion of primitives to object type.

// 1. Allows properties and methods to be used on primitives.
// 2. Example: Strings have properties and methods like length, toUpperCase(), replace() etc.

const sentence = "Welcome to the World of JavaScript";

console.log(sentence.toUpperCase());
console.log(sentence.replace("Welcome", "Hare Krsna"));

// The JS converts the String to Object type when we try to use properties and methods of it;
console.log(typeof "");
console.log(typeof new String());