//* ---------------------------------------------------
//*  First-Class Function - it's just a concept
//* ---------------------------------------------------

// A language feature where functions are treated as first-class citizens.
// Functions can be assigned to variables, passed as arguments to other functions, and returned from other functions.

//?   A "first-class function" means that functions can be treated as values, assigned to variables, and passed around as arguments.

// a function
function greet(user){
  return `Hare Krsna! ${user}`;
}

// assigning the above function to a variable; now this function is called first-class function
const krsna = greet;

console.log(greet("Ritesh Rai"));

//* -------------------------------
//*  Higher-Order Functions:
//* -------------------------------
//? Definition: A higher-order function is a function that takes one or more functions as arguments or returns a function as a result.

//* -------------------------------
//*  Callback Functions:
//* -------------------------------
//? Definition: A callback function is a function passed as an argument to another function and is executed after the completion of a task.

// A Higher Order Function which has Callback function as argument
const verifyUser = (username="krsna",port_number, callback) =>{
  console.log("user is verifying");
  // calling a callback function
  setTimeout(()=>{
    callback(port_number);
  },5000);

  setTimeout(()=>{
    console.log("User is verified as:",username);
  },2000);
}

const connectToServer = (PORT=80) =>{
  console.log("connecting to server...");
  setTimeout(()=>{
    console.log("server is successfully connected with PORT:",PORT);
  },3000);
}

// verifyUser("Ram",3308,connectToServer);
// verifyUser(undefined,undefined,connectToServer);

//* -------------------------------
//*  Closure:
//* -------------------------------

//? A closure is created when an inner function has access to the variables of its outer function, even after the outer function has finished executing.

function outerFunction(){
  const outerVariable = "Jai Jai Krsna";
  function innerFunction(){
    console.log(outerVariable);
  }
  return innerFunction;
}

const closureFunction = outerFunction();
closureFunction();

// Here when we are calling the closureFunction() it is actually going to call the innerFunction() but in our executionContext the outerFunction is already popped  out. Still we can access the outerVaribale value and how we are able to access it, is what closure all about ?

// We just need to know that an inner function has always access to the variables of the outer (parent) function. That's it.

// Why is it like that? It's because the variable object of the parent function stays in memory even after the function returns, and our inner function has access to this variable object through the scope chain.

// It might be beneficial to clarify that the call stack is simply the execution order and it is not the same thing as the computer's memory, which is where the variables are held.  So even though the function was removed from the call stack, its variables are still maintained in memory until they are no longer needed and garbage collection comes and removes them.
