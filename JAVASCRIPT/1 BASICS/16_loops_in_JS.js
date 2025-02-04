// while loop
/*Syntax:
    var var_name = value;
    while(condition){
      ...
      increment_decrement
    }
*/

let i=1;
console.log("while loop");

while(i<=10){
  console.log(i);
  i++; //postfix increment operator
}

// do..while loop
/*Syntax:
  do{
    ...
  }while(condition);
*/

let j = 0;
console.log("do..while loop");

do{
  console.log(j);
  j++;
}while(j<=10);

// for loop
/*Syntax:
  for(initialization; condition; increment/decrement){
    ...
  }
*/

console.log("for loop");

for(let x=0; x<=50; x++){
  console.log(x);
}

// Print Table of 5
let num=1;
do{
  console.log(`5 X ${num} = ${5*num}`);
  num++;
}while(num<=10);

// calculate sum of 10 numbers using for loop
let sum=0;
for(let i=0; i<=10; i++){
  sum = sum+i;
  console.log(sum);
}