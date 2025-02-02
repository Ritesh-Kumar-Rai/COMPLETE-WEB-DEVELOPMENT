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
const person_age = 15;
const isRegisteredForVote = true;
const isIndianCitizen = false;

if(person_age >= 18 && isRegisteredForVote && isIndianCitizen){
  console.log("You are eligible for vote.");
}else if(person_age < 18 && isRegisteredForVote === 'false' && isIndianCitizen === 'false'){
  console.log('You are not eligible for vote!');
}else if(person_age >= 18 && isIndianCitizen === 'false'){
  console.log('You are not eligible for vote due to citizenship status!');
}else if(person_age >= 18 && isIndianCitizen && isRegisteredForVote === "false"){
  console.log("You are not eligible for vote due to registration status!");
}else{
  console.log("Oops! You are not eligible for vote!");
}