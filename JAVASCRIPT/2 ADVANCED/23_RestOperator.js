// Rest Operator
// The rest operator allows you to represent an indefinite number of elements as an array. It is used in function parameters to handle variable numbers of arguments and in destructuring to capture the remaining elements.

// 1: Function Parameters
// You can use the rest operator to collect remaining arguments into an array when destructuring function parameters.

const sum = (...numbers) =>{
  return numbers.reduce((total, num)=> total+num,0);
}

console.log(sum(1,2,3,4,5));

// or 

function logAll(first,second, ...others){
  console.log(first, second, others);
}
logAll(10,20,30,40,50); // 10 20 [30,40,50]


// 2: Destructuring Arrays
const [first, second, ...rest] = [1, 2, 3, 4, 5];

console.log(first); // 1
console.log(second); // 2
console.log(rest); // [3, 4, 5]


// 3: Destructuring Objects

const student = {
  name: "Ritesh Rai",
  age: 17,
  grades: {
    math: 90,
    science: 85,
  },
  school: "ABC High School"
};

const { name, age, ...otherProps } = student;

console.log(name); // Ritesh Rai
console.log(age); // 17
console.log(otherProps); // { grades: { math: 90, science: 85 }, school: "ABC High School" }



// Key Differences:

// *Spread Operator: Used to expand elements (arrays, objects) in places where multiple elements are expected.

// *Rest Operator: Used to collect multiple elements into an array or an object.