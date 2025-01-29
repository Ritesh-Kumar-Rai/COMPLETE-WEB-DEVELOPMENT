// Comparision Operators

// 1. == (equal to) operator [it does implicit (automatic) conversion of datatype]
let age1 = 18;
let age2 = 24;
console.log("Equal to Operator");

console.log(age1 == age2); //false

let ageA1 = "24";
let ageB2 = 24;
console.log(ageA1 == ageB2); //true

// 2. === (strict equality) operator [you have to do explicit (manual) conversion of datatype]
console.log("Strict Equal to");

console.log(ageA1 === ageB2); //false
console.log(parseInt(ageA1) === ageB2); //true

// 3. != not-equal to operator
console.log('Not Equal to');

console.log(age1 != age2); //true
console.log(ageA1 != ageB2); // false

// 4. !== not-equal to strict operator
console.log("Strict Not Equal to");

console.log(age1 !== age2); // true
console.log(ageA1 !== ageB2); // true
console.log(parseInt(ageA1) !== ageB2); // false

// 5. > Greater than operator
console.log("Greater than");
console.log(age1 > age2); // false

// 6. < Less than operator
console.log("Less than operator");
console.log(age1 < age2); // true

// 7. >= Greater than and equal to
console.log("Greater than and equal to");
console.log(ageA1 >= ageB2); // true


// 7. <= Less than and equal to
console.log("Less than and equal to");
console.log(ageA1 <= ageB2); // true
