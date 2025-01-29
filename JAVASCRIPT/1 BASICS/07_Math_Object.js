// Arithmetic Operators
// +, -, *, /, % and **

// ** is called exponential operator used to calculate power of any number
// Example: 2^2 = 4
console.log(2*2); //4
console.log(2**2); // using expo. operator

// 5 to the power 5th is 3125;
console.log(5*5*5*5*5); // 3125
// using ** operator
console.log(5**5); // 3125

console.log(Math.pow(5,5)); // ** is equal to Math.pow()

// Math Object in JS

console.log(Math.PI);
console.log(Math.sqrt(16));// square root helps us to find which number is multiplied by itself which produces the given result, In our case 4*4 = 16

// square of 25 is 5 (5 X 5 = 25)
console.log(Math.sqrt(25)); // 5
console.log(Math.sqrt(5)); // 2. something

// Math.pow()

console.log(Math.pow(2,6)); // 64
// same result using ** operator 
console.log(2 ** 6); // 64

// Math.floor() : It removes the decimal numbers and convert number to smaller ones
console.log(Math.floor(2.5)); //2
console.log(Math.floor(2.999)); //2
console.log(Math.floor(-5.3)); // -6 which is smaller than -5

// Math.ceil() it will convert to bigger one

console.log(Math.ceil(2.4)); //3
console.log(Math.ceil(2.1)); // 3
console.log(Math.ceil(-2.8)); // -2
console.log(Math.ceil(15.25)); //16


// Math.round() returns nearest number
console.log(Math.round(5.3)); //5
console.log(Math.round(5.5)); //6
console.log(Math.round(-5.5)); //-5
console.log(Math.round(-5.8)); // -6

// Math.random() default ranges 0 to 1 in decimal

console.log(Math.random());
console.log(Math.floor((Math.random() * 10)+1)); // 1 to 10

// Infinity and NaN
const value = 8/0;
console.log(value, typeof value);
const value2 = 0/0;
console.log(value2, typeof value2);













