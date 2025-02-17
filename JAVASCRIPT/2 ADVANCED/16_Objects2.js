// Explain the difference between passing objects by reference and by value in JavaScript. Provide an example to demonstrate each scenario.

//? sol: In JavaScript, primitive data types like numbers and strings are passed by value, while objects are passed by reference.

//? 1. Passing by value: When passing by value, a copy of the primitive value is created and passed to the function or assigned to a variable. Any changes made to the copy do not affect the original value.

let a = 10;
let b = a;
console.log(a,b);
b = "Watchdogs 2";
console.log(a,b); // value of a is not changed this is pass by value

//? Passing by reference: When passing by reference, a reference to the memory location of the object is passed to the function or assigned to a variable. Any changes made to the object through this reference will affect the original object.

const obj = {name: "JS", year: 2025};
const obj2 = obj;
console.log(obj,obj2);

obj2.name = "ADVANCED JS";

console.log(obj,obj2); // the property of obj has been changed because of obj2

// or 
let arr = [10,20];
let arr2 = arr;
arr2.pop();
console.log(arr,arr2);
// This is passed by reference

// To avoid this behavior and create a true copy of the object, you can use methods like Object.assign() or the spread operator (...):

//? Object.assign() is used to copy properties from one or more source objects to a target object.
// Syntax of Object.assign(): Object.assign(target, variables...);
let original_obj = {name: "cyberpunk", device: "pc"};
let newObj = Object.assign({}, obj);
newObj.name = "Far Cry 6";

console.log(original_obj, newObj);

// The Object.assign() can be also use for concatenation of objects like Object.assign({}, obj1, obj2, ...);

// Or using spread operator
let OrgArr = [100,200];
let newArr = [...OrgArr];
newArr.pop();
console.log(OrgArr, newArr);


// Comparison by Reference:
//? Two objects are equal only if they refer to the same object.
//? Independent objects (even if they look alike) are not equal:

const myName = {name: "Ritesh Rai"}
const myName2 = {name: "Ritesh Rai"}

const isSame = myName === myName2 ? true : false;
console.log(isSame) // false

const newName = myName;
const isSame2 = myName === newName ? true : false;
console.log(isSame2); // true
// same for array

let array = ["ritesh"];
let array2 = ["ritesh"];
let newArray = array;
console.log(array === array2);
console.log(newArray === array);

// JSON (JavaScript Object Notation):

//?JSON is a data interchange format derived from JavaScript objects. Objects can be easily converted to JSON and vice versa.

let student = {
  id: 1,
  sName: "Ritesh Rai",
  sAge: 16,
  isStudent: false,
  greet: function () {
    console.log(
      `hey my id is ${student.id} & my name is ${student.sName}`
    );
  }
};
student.greet();
let jsonData = JSON.stringify(student);
console.log(jsonData);
let parsedJSON = JSON.parse(jsonData);
console.log(parsedJSON);

// Difference Between JSON and Object
// 1. JSON
// -> It is a Data Format
// -> JSON has textual presentation of data: means JSON is represented as a String. 
// -> Strict Syntax: All keys and string values are enclosed within double-quotes
// like : { "name": "lorem", "id": 122}
// -> No Functions: The JSON does not contains any functions or methods because it is purely a data representation format.

// 2. Object
// -> It is a Data Structure
// -> In-Memory Representation: The Object are exists in memory and it is a part of code execution
// -> Flexible Syntax: JavaScript objects have a more flexible syntax. Keys can be unquoted if they are valid identifiers, and strings can be enclosed in single or double quotes.
// like : { name: 'React', id: 134}
// -> Functions and Methods: JavaScript objects can include functions, which can act as methods or perform other operations.