// "this" Object 

//? In JavaScript, the this keyword refers to an object.

// Which object depends on how this is being invoked (used or called).

// The this keyword refers to different objects depending on how it is used:

// In an object method, this refers to the object.
// Alone, this refers to the global object.
// In a function, this refers to the global object.
// In a function, in strict mode, this is undefined.
// In an event, this refers to the element that received the event.
// Methods like call(), apply(), and bind() can refer this to any object.

// Note
// this is not a variable. It is a keyword. You cannot change the value of this.
// "use strict";

function callme(){
  console.log(this); // refers to global object in Nodejs & window object in browser
}
// callme();

// Let's check the this keyword values in an object methods

const obj = {
  name: "JS developer",
  func: function(){
    console.log(this); // refers to current object
  }
}

obj.func();

// In this example, the greet method is defined using the "Method Shorthand" syntax. It's a more concise way to define methods in object literals.

const obj2 = {
  name: "JavaScript",
  greet(){
    console.log(this);
  }
};

obj2.greet();

//* Fat Arrow Function
const obj3 = {
  name: "Ritesh Kumar Rai",
  greet: () => {
    console.log(this); // In node js, this inside fat arrow function refers empty {}, but in browser this refers to window object 
  },
};

obj3.greet();

const arrowFunc = () =>{
  console.log(this); // {} empty object in nodejs and window object in browser
}
arrowFunc();

const test = function(){
  let chant = "Hare Krsna";
  const obj = {pak: 67};
  const inner = () => ([10,20,30,50]);
  function innerFunction(){
    console.log("inner function of function keyword");
    console.log(this);
  }
  console.log(this);
  innerFunction();
}
// test();

const test2 = () => {
  let chant = "Hare Krsna";
  const obj = {pak: 67};
  const inner = () => ([10,20,30,50]);
  innerFunction = () =>{
    console.log("inner function of arrow function");
    console.log(this)
  }
  console.log(this);
  innerFunction();
}
test2();

