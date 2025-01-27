// Variable is a container (box) that holds a value.

// Syntax : variable_name = value
year = 2025;
// or 
// Syntax: variable_key variable_name = value;
var firstName = "Ritesh";

// Types of variables or 3 ways to declare variables
//  var, let and const

// var is a functional scope, let is a block scope and const is a block scope and constant;

// any variable which is declared using var and let are re-initialised, to stop this we use const

let lastName = "Kumar Rai";
let age = 23;
let isActive = true;
let a;

const intro = "Namaste, My name is "+firstName+" "+lastName + " my age is "+age+ " and my online status is "+isActive;

console.log(intro);


console.group("Let's check the data type of each variables using typeof operator");
console.table([{
    variable_name: "firstName",
    data_type: typeof firstName
},{
    variable_name: "lastName",
    data_type: typeof lastName
},{
    variable_name: "age",
    data_type: typeof age
},{
    variable_name: "isActive",
    data_type: typeof isActive
},{
    variable_name: "intro",
    data_type: typeof intro
},{
    variable_name: "a",
    data_type: typeof a
}]);

// Note var supports Hoisting while let and const does not support Hoisting.
// Example:

console.log(global_var);

var global_var = "GLOBAL";

//console.log(scoped_var); // error

let scoped_var = "SCOPED";

//console.log(constant_var); // error


const constant_var = "CONSTANT";

// The error occured in let and const is because we can't access the variables before initialization when we use let and const. and this is Hositing where we
// access the data before initialization; wheareas var does not produce error but the data will not be accessible before init..


// Naming Vriables Rules & Best Practices

// 1. Variable names must start with a letter, an underscore (_) or a dollar sign ($).
// 2. Can’t start with a number
// 3.  Variables cannot be the same as reserved keywords such as if or const.
// 4. Variable names cannot contain spaces.
// 5. Variable names are case sensitive.
// 6.  By convention, JavaScript variable names are written in camelCase.
// 7.  Variable names can be as long as you need 
// 8. = is for assignment
// 9. ; means end of instruction

// Naming Conventions

/** camelCase
    • Start with a lowercase letter. Capitalize the first letter of each subsequent word.
    • Example: myVariableName */

/** snake_case
    • Start with an lowercase letter. Separate words with underscore
    • Example: my_variable_name */

/** Kebab-case
    • All lowercase letters. Separate words with hyphens. Used for HTML and CSS.
    • Example: my-variable-name */ 

/** Keep a Good and Short Name
    • Choose names that are descriptive but not too long. It should make it easy to understand the variable's purpose.
    • Example: age, firstName, isMarried */    
