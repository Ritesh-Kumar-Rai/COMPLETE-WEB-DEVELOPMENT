// The Error Object & Custom Errors in JavaScript

// 1. The error object: For all the built-in errors, the error object has following properties:
/*
1. name: The name of the error (e.g., Error, TypeError, RangeError, etc.).

2. message: A descriptive message of the error.

3. stack: A stack trace that indicates the point in the code where the error was instantiated (can be helpful for debugging). 
Example:
  const error = new Error('This is an error message');
  console.log(error.name);    // "Error"
  console.log(error.message); // "This is an error message"
  console.log(error.stack);   // Stack trace
*/

// Throwing custom error
const age = 19;
try {
  console.log('age:'+age);
  if(age > 18){
    // throw new Error("age must not be greater than 18");
    throw new RangeError("age must not be greater than 18");
  }
} catch (error) {
  console.log(error.name);
  console.log(error.message);
  // console.log(error.stack);
}

// You can control more to your custom errors by extending the built-in Error class. See how:

class chantingError extends Error{
  constructor(message, extra){
    super(message);
    this.name = "chant_not_complete_error";
    this.extra = extra; // Additional custom property
  }
};

function submitChantRounds(rounds=0){
  try {
      if(rounds < 16){
        throw new chantingError("chanting is not completed", {
          chantingRounds: rounds,
          minimum_criteria: 16,
        });
      }
      console.log("Hari Bol! You have chanted:",rounds, "rounds");
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
    console.log(error.extra);
  }
}
let no_of_rounds_chanted = 6;

setTimeout(()=>{
  console.clear();
  submitChantRounds(no_of_rounds_chanted);
},8000);



// Custom Error in Promises
const promise1 = new Promise((resolve, reject)=>{
  setTimeout(()=>{
    reject(new Error("Promise has been rejected."));
  },3000);
});

promise1
.then((val)=> console.log(val))
.catch((err)=>{
  console.log(err.message);
});