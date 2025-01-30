// Logical Operator

// 1. && Logical AND operator
const studentAge = 21;

const isCollegeStudent = (studentAge > 18) && (studentAge < 24);

console.log(isCollegeStudent); // true

const isSchoolStudent = (studentAge >= 5) && (studentAge <= 18);

console.log(isSchoolStudent);


// 2. || Logical OR operator
const isStudent = isSchoolStudent || isCollegeStudent;
console.log(isStudent);

// The logical || and &&, returns truthy and falsy value not true/false.

console.log("Truthy and Falsy");
console.log(25 && 67);
console.log(250 && 12);
console.log(-2 && 5); // -2 is truthy
console.log(0 && 12);
console.log(0 || -0); // -0
console.log(-25 || 12); // -25
console.log(-0 || -5); // -5

// Level 1
const andResult = "" && "Ram"; // ""
const orResult = "" || "Ram"; // "Ram"

console.log(andResult, orResult);

// level 2
const andResult2 = "Krsna" && null; // null
const orResult2 = "Krsna" || null; // "Krsna"
console.log(andResult2, orResult2);

// Level 3
const andResult3 = "Narsimha" && 4+5; // 9
const orResult3 = "Narsimha" || 4+6; // "Narsimha"
console.log(andResult3, orResult3);

// Level 4
const andResult4 = "Hanuman" && -4 + 4;
const orResult4 = undefined || "Hanuman";
console.log(andResult4, orResult4);

// Level 5
const andResult5 = "Namaste" && console.log("Namaste"); // undefined
const orResult5 = undefined || console.log("Namaste"); // undefined
console.log(andResult5, orResult5);

// 3. ! Logical NOT operator
// -> !(NOT) operator converts truthy to falsy AND falsy to truthy
console.log("Logical NOT ! Operator");

console.log(!true);//false
console.log(!false); //true
console.log(!5); // false
console.log(!!true); //true [because true first convert to false then again converts to true because of ! second NOT operator]


