//* ======================================
// Interview Question - Objects
//* ======================================

//! What will be the output?
const a = { x: 20, y: 40};
const b = { y: "word", z: true};

const mergedObject = Object.assign({}, a, b);
console.log(mergedObject); // y is changed to 'word'

//* ===============================================
//* Interview Question - Object Manipulation:
//* ================================================

//! Problem: Given an object representing a student, write a function to add a new subject with its corresponding grade to the student's record. Also check if the grades property is present or not?

let student = {
    name: "Ritesh Rai",
    age: 17,
    grades: {
      math: 90,
      science: 85,
      history: 88,
    }
  };

function addSubjectGrade(obj, subject, marks){
    // First validate it
    if(Object.prototype.toString.call(obj) !== "[object Object]"){
      throw new Error("Invalid input type. 'obj' should be an object.");
    }
    if(typeof subject !== "string"){
      throw new Error("Invalid input type. 'subject' should be an string.");
    }
    if(typeof marks !== "number" || marks < 0 || marks > 100){
      throw new Error("Invalid marks. 'marks' should be a number between 0 and 100.");
    }

    // Check if the grades property exists in the object
    if(!obj.grades || !obj.hasOwnProperty("grades")){
      obj.grades = {};
    }

    // Add or update the subject and marks in the grades property
    obj.grades[subject] = marks;
    
}  

addSubjectGrade(student, "computer", 95);
// console.log(student);  


//* ===============================================
//* Interview Question - Object Comparison:
//* ================================================

//! Problem: Write a function that compares two objects to determine if they have the same properties and values.

function areObjectsEqual(obj1, obj2){
  
  if(Object.prototype.toString.call(obj1) !== "[object Object]"){
    throw new Error("Invalid input type. 'obj1' should be an object.");
  }
  if(Object.prototype.toString.call(obj2) !== "[object Object]"){
    throw new Error("Invalid input type. 'obj2' should be an object.");
  }

  const o1 = Object.keys(obj1);
  const o2 = Object.keys(obj2);

  if(o1.length !== o2.length) return false;

  // checking for keys
  for(let i=0; i<o1.length; i++){
    if(o1[i] !== o2[i]) return false;
    // console.log(o1[i] + "==" + o2[i]);
  }

  // checking for values
  for(let key in obj1){
    if(obj1[key] !== obj2[key]) return false;
    // console.log(obj1[key] +" === "+ obj2[key]);
  }
  return true;
}

// Example usage:
let objA = { name: "Aiden Pierce", age: 26, city: "Chicago" };
let objB = { name: "Aiden Pierce", age: 26, city: "Chicago" };
let objC = { name: "Bob", age: 30, city: "San Francisco" };
console.log(areObjectsEqual(objA, objB)); // true
console.log(areObjectsEqual(objA, objC)); // false

//* ===============================================
//* Interview Question - Object Transformation:
//* ================================================

//! Problem: Write a function that transforms an array of an objects into an object where the keys are the objects' ids.
let inputArray = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

const convertArrayToObject = (arr) =>{
  if(!Array.isArray(arr)){
    throw new Error("Invalid Array type!");
  }

  const newObject  = {};
  arr.forEach((each_val_object)=>{
      newObject[each_val_object.id] = each_val_object;
  });

  return newObject;
}

const convertedObj = convertArrayToObject(inputArray);
console.log(convertedObj);
