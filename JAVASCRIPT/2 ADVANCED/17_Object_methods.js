// Object useful methods

const ps5Pro = {
  name: "PlayStation 5 Pro",
  releaseDate: "November 7, 2024",
  price: {
    USD: 699.99,
    GBP: 699.99,
    AUD: 1199,
    INR: 96_795
  },
  dimensions: {
    width: "15.2 in",
    height: "3.5 in",
    depth: "8.5 in"
  },
  storage: "2TB SSD",
  features: {
    graphics: "45% faster rendering, advanced ray tracing",
    resolution: "AI-enhanced 4K resolution with PlayStation Spectral Super Resolution",
    frameRate: "Supports 60Hz and 120Hz displays",
    connectivity: "Wi-Fi 7",
    backwardsCompatibility: "Plays over 8,500 PS4 games with enhanced performance",
    controller: {
      name: "DualSense",
      features: ["Haptic feedback", "Adaptive triggers"]
    }
  }
};

// 1. Object.keys(): Returns an array containing the names of all enumerable own properties of an object.
let keys = Object.keys(ps5Pro);
// console.log(keys);

let features_keys = Object.keys(ps5Pro.features);
// console.log(features_keys);

// 2. Object.values(): Returns an array containing the values of all enumerable own properties of an object.
let values = Object.values(ps5Pro);
// console.log(values);
let features_values = Object.values(ps5Pro.features);
// console.log(features_values);

// 3. Object.entries(): Returns an array containing arrays of key-value pairs for each enumerable own property of an object.
let entries = Object.entries(ps5Pro);
// console.log(entries);
let price_entries = Object.entries(ps5Pro.price);
// console.log(price_entries);

// 4. ObjectName.hasOwnProperty(): Returns a boolean indicating whether the object has the specified property as an own property.
console.log(ps5Pro.hasOwnProperty("name")); // true
console.log(ps5Pro.price.hasOwnProperty("INR")); // true
console.log(ps5Pro.hasOwnProperty("game")); // false

if(ps5Pro.hasOwnProperty("features")){
  // console.log(Object.entries(ps5Pro.features));
}

// 5. Object.assign(): Copies the values of all enumerable own properties from one or more source objects to a target object. [Note: It also used for concatenation of objects]
const target = { a: 1, b: 5 };
const source = { b: 3, c: 4 };
// const mergedObject = Object.assign({}, target, source);
const mergedObject = Object.assign(target, source);
console.log(mergedObject); // here the b property is override because Object.assign() will not copy or concatenate same key more than 1 times;

// another way is spread operator ...
const newObj = {...target} // here target is set as a,b,c because we have assigned source to target..Oops
console.log(newObj);
console.log(target, source); // same result

// [Note: try to always use Object.assign({}, obj1, obj2) because above because we used Object.assign(obj1, obj2) it will modified the obj1 so for the safety always assign both obj to empty {}]

// 6. Object.freeze(): Freezes an object, preventing new properties from being added to it and existing properties from being modified or deleted.

Object.freeze(ps5Pro);
ps5Pro.name = "PS4 pro";
console.log(ps5Pro.name);

// another bonus is use delete keyword also called as `delete operator` in case of deletion of any property from an object
const obj = {
  id: 90,
  name: "cofee",
  serverName: 3300
};
// here i want to delete the server name from the object 
// console.log(obj);
// delete obj.serverName;
// console.log(obj);

// Question how can i change the key name of any property from obj without affecting it's value?

const student = {
  name : "lorem epsilum",
  class: 10,
  choosedSubject: "Sanskrit"
};
// let's change the name key as fullName
console.log(student); 

// 1. First way using delete operator
/*student.fullName = student.name;
console.log(student);
delete student.name;
console.log(student);
 -> Here fullName placed at last property, and we can't change the position
*/

// 2. Second way without affecting the position of properties
const updatedStudent = {
  fullName: student.name,
  class: student.class,
  choosedSubject: student.choosedSubject
}; 
// console.log(updatedStudent);

// 3. way using destructuring & (...) rest operator
let {name : fullName, ...rest_properties} = student;

const updatedStudent2 = {fullName, ...rest_properties};
console.log(updatedStudent2);
