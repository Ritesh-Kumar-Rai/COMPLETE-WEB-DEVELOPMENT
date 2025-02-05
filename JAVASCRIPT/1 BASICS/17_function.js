// function

function showName(){
  console.log("Ritesh Kumar Rai");
}

showName();

function sum(a = 0,b = 0){
  return a+b;
}

console.log(sum(50,100));

// Reverse a String
function reverseString(str=""){
  let tempStr = new String();
  const totalLength = str.length;
  for(let i=totalLength-1; i>=0; i--){
      tempStr = tempStr+str[i];
  }

  return tempStr;
}

const str = reverseString("hare krsna");
console.log(str);
