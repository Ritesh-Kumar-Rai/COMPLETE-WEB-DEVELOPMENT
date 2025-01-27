// Data Type conversion is a way to convert from one datatype to another

// Convert String to Number
let a = "10";
console.log(typeof a); // string
console.log(typeof +a); // number
console.log(typeof Number(a)); // number

console.log("2nd");


let b = "aa100";
console.log(typeof +b, +b); //number NaN
console.log(typeof Number(b), Number(b)); // number NaN
console.log(typeof parseInt(b), parseInt(b)); // number NaN

console.warn("3rd");

let c = "200uiui";
console.log(typeof +c, +c); // number NaN
console.log(typeof Number(c), Number(c)); // number NaN
console.log(typeof parseInt(c), parseInt(c)); // number 200

console.log("parseFloat()");
let d = "21.2";
console.log(typeof parseInt(d), parseInt(d));
console.log(typeof parseFloat(d), parseFloat(d));

// NaN means Not a Number, when we convert a non-convertable value into number then we got NaN.
console.log(isNaN(2)); // false
console.log(isNaN("secure")); // true


// Convert Number to String
console.log("Convert Number to String");

let num1 = 120; // number
console.log(typeof num1, num1); // number 120
console.log(typeof (num1+""), num1+""); // string 120
console.log(typeof String(num1), String(num1)); // string 120
console.log(typeof num1.toString(), num1.toString()); // string 120

















