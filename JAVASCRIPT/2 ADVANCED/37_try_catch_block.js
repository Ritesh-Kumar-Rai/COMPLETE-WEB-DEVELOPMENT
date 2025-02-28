// * In JavaScript, the try...catch statement is used for error handling. It allows you to catch and handle exceptions (errors) that occur within a block of code. Here's how it works:

//  ? try Block: The try block contains the code that you want to execute. It is the block of code where you anticipate that an error might occur.

// ? catch Block: The catch block follows the try block and is used to catch any exceptions (errors) that occur within the try block. If an exception occurs, JavaScript jumps to the catch block to handle the error. The catch block takes an error object as a parameter, which can be used to access information about the error, such as its message or stack trace.

// ? finally Block (Optional): The finally block, if provided, is executed regardless of whether an error occurs or not. It is typically used for cleanup tasks that should always be performed, such as closing resources or releasing locks. 

try{
  function sum(){
    console.log(a+b);
  }
  console.log(user);
  sum();
}catch(e){
  // console.log("Oops! Error");
}

// console.log("Hare Krsna!");

function sleep(time_in_milli = 500) {
  return new Promise((resolve, reject)=>{
    setTimeout(()=> resolve(true),time_in_milli);
  });
};

async function main(){
  try {
    console.log("Hacking Device RMX5200...");
    await sleep(2000);
    console.log("Fetching data...");
    await sleep(2000);
    console.log("Penetrating Wifi... please wait..");
    await sleep(4000);
    console.log("Wifi hacked. executrance..");
    await sleep(1000);
    console.log("gathering data...");
    await sleep(7000);
    console.log("data fetched successfully.");
    await sleep(5000);
    console.log("Device name:",device);
  } catch (error) {
    console.log('Oops! failed to get device name.',error);
  }finally{
    setTimeout(()=>{
      console.log("Success.. device is hacked");
    },1000);
  }
}

main();