// Destructuring is a convenient way to extract values from arrays or properties from objects and assign them to variables in JavaScript. This makes the code more concise and readable.

// 1. Array Destructuring

// Array destructuring allows you to extract values from an array and assign them to variables in a single statement. Here's an example:

// Array destructuring
const numbers = [1, 2, 3, 4];

// Extract values into variables
const [first, second, third] = numbers;

console.log(first, second, third); // 1 2 3

// You can also skip values by leaving the corresponding space empty:

const [ pehla, , tisra] = numbers;
console.log(pehla, tisra); // 1 3

// 2. Object Destructuring

// Object destructuring allows you to extract properties from an object and assign them to variables. Here's an example:

// Object destructuring
const student = {
  name: "Ritesh Rai",
  age: 17,
  grades: {
    math: 90,
    science: 85,
    history: 88,
  },
};

// Extract properties into variables
// const { name, age } = student;

// console.log(name); // Ritesh Rai
// console.log(age);  // 17

// You can also rename variables during destructuring:

const { name: student_name, age: student_age} = student;
console.log(student_name, student_age); // Ritesh Rai 17


// 3. Nested Destructuring

// Destructuring can be used to extract values from nested objects or arrays:

// Nested object destructuring
const {
  grades: { math, science },
} = student;

console.log(math);    // 90
console.log(science); // 85


// 4. Default Values

// You can also provide default values in case the property or element is undefined:

// const {name, grade = 98, isTopper=true} = student;

// console.log(name, grade, isTopper);

// 5. Function Parameters

// Destructuring can be used to easily extract values from function parameters:

function displayStudent({name, age}){
  console.log(`The student name is ${name} has age of ${age}`);
}
displayStudent(student); // in case of passing object as arguments


// 6. Combining with the Rest Operator

// You can use the rest operator (...) to collect the remaining properties or elements:

const {name, ...rest} = student;
console.log(name, rest);

// Example with Arrays

const god_names = ["Shiv", "Krsna", "Ram", "Narsimha Dev", "Narayan", "Varaha", "Parshuram", "Kalki", "Shyam"];

// Destructuring with rest operator
const [MahaKal, secondGod, ...anantaHari] = god_names;

console.log(MahaKal); // Shiv
console.log(secondGod); // Krsna
console.log(anantaHari); // ['Ram', ...]


// 7. Dynamic Property Names

// You can use dynamic property names when destructuring objects. This can be useful when the property name is stored in a variable.

const propertyName = "name";
const {[propertyName]: naam} = student;

console.log(naam);

// 8. Deeply Nested Destructuring

// You can destructure deeply nested objects or arrays.

const complexObject = {
  level1: {
    level2: {
      level3: {
        value: 42
      }
    }
  }
};

const {level1 : { level2 : { level3 : {value} }}} = complexObject;
console.log(value);

// 9. Swapping Variables

// Destructuring can also be used to swap values between variables without the need for a temporary variable.

let a = "Ram";
let b = "Krsna";
console.log(a,b); // Ram Krsna

// swapping values
[a,b] = [b,a];
console.log(a,b); // Krsna Ram