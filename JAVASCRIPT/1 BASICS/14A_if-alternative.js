console.log("if statement alternatives");

let age = 16;
let result;
/*
if(age > 18){
  result = "Adult";
}else{
  result = "Kid";
}*/

// 1. Ternary Operator: for quick one line if-else
// Syntax: condition ? trueValue : falseValue;
result = (age > 18) ? "Adult" : "Kid";
console.log(result);

// 2. Guard Operator: Use when a fallback value is needed
// Syntax: value || defaultValue
// let PORT_NUMBER = 3300;
let PORT_NUMBER = NaN;

const required_port_address = PORT_NUMBER || 80;
console.log("port number to connect with server is "+required_port_address);

// 3. Default Operator: Use when you want to consider only null and undefined as falsy.
// Syntax: value ?? fallbackValue
let chanting_mala_count;

const Total_mala_rounds = chanting_mala_count ?? 16;
console.log("TOTAL MALA CHANTED : "+Total_mala_rounds+" rounds"); 

// Note to use above if..else alternatives:
// 1. It simplifies conditional logic.
// 2. Use wisely to maintain readability. 