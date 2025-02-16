// Timing based Events in JS

// 1. setTimeout() function

function delayedFunction(){
  console.log("This function will execute after 2000 milliseconds (2 seconds)");
}

setTimeout(delayedFunction, 2000);

function delayedFunction2(port = 80){
  console.log(`Server is connected to PORT number: ${port}`);
}

console.log("connecting to server...");
setTimeout(()=> delayedFunction2(3308), 4000);

// 2. setInterval() function 

function repeatedFunction(){
  console.log(`The data packet fetched: ${Math.round(Math.random() * 10)}`);
}

const repeatedTmr = setInterval(repeatedFunction, 4000);

// 3. clear timeouts with clearTimeout()

const timer = setTimeout(function(){
  console.log("Virus injected to the System. after 6 seconds");
},6000);

clearTimeout(timer); // it will clear the setTimeout function

// 4. clear intervals with clearInterval()

setTimeout(()=> clearInterval(repeatedTmr), 20000); // this will stop the above data packet interval function after 20sec.