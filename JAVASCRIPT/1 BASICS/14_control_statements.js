// if..else statement

let temperature = 25;

if(temperature < 20){
  console.log("Go to beach!")
}else{
  console.log("Stay at home!");
}

// else if statement
let kanpur_temperature = 15;

if(kanpur_temperature >= 20){
  console.log("Go to beach!");
}else if(kanpur_temperature>=10 && kanpur_temperature<20){
  console.log("Watch T.V and have a Tea!");
}else{
  console.log("Blanket lo aur so jao!");
}

// Practice

//! Requirements:
//? If the person is 18 years or older, a citizen, and registered to vote, display a message saying they are eligible to vote.
//? If the person is younger than 18, not a citizen, or not registered to vote, display a message saying they are not eligible to vote.
//? If the person is 18 or older but not a citizen, display a message saying they are not eligible due to citizenship status.
//? If the person is 18 or older, a citizen, but not registered to vote, display a message saying they are not eligible due to registration status.
//? Extended voting eligibility checker with additional conditions

const person_age = 18;
const isRegisteredForVote = true;
const isIndianCitizen = false;

/*if(person_age >= 18 && isRegisteredForVote && isIndianCitizen){
  console.log("You are eligible for vote.");
}else if(person_age < 18 && isRegisteredForVote === false && isIndianCitizen === false){
  console.log('You are not eligible for vote!');
}else if(person_age >= 18 && isIndianCitizen === false){
  console.log('You are not eligible for vote due to citizenship status!');
}else if(person_age >= 18 && isIndianCitizen && isRegisteredForVote === false){
  console.log("You are not eligible for vote due to registration status!");
}else{
  console.log("Oops! You are not eligible for vote!");
}*/

// Optimized for readability
if(person_age >=18){
  if(isIndianCitizen){
      if(isRegisteredForVote){
        console.log("You are eligible for vote.");
      }else{
        console.log("You are not eligible for vote due to registration status!");
      }
  }else{
    console.log('You are not eligible for vote due to citizenship status!');
  }
}else{
  console.log("You are not eligible for vote! because you are younger");
}

// Interview questions:

// 1: Write a program to check if a number is even or odd.
const num = "6";

if(num % 2 === 0){
  console.log("Number is Even.");
}else{
  console.log("Number is Odd.");
}

// 2: Write a program to check if a number is positive, negative, or zero.
const check = -1;
if(check === 0){
  console.log("Number is Zero");
}else if(check > 0){
  console.log("Number is Positive");
}else{
  console.log("Number is Negative");
}

// Ternary Operator: condition ? true : false;
const userLoggedIn = true;
userLoggedIn ? console.log("User LoggedIn") : console.log("User not LoggedIn");
 