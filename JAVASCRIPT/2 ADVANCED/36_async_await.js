//  async and await are JavaScript keywords introduced in ECMAScript 2017 (ES8) that make asynchronous code look and behave more like synchronous code, making it easier to write, read, and reason about asynchronous operations.

//? async Function Declaration: The async keyword is used to declare an asynchronous function. An asynchronous function returns a Promise implicitly, even if the return value is not explicitly wrapped in a Promise. Inside an asynchronous function, you can use the await keyword to pause the execution of code until a Promise is resolved or rejected.

// ? await Operator: The await keyword is used to pause the execution of an async function until a Promise is settled (resolved or rejected). It can only be used inside an async function. When await is used with a Promise, it waits for the Promise to resolve and returns the resolved value. If the Promise is rejected, it throws an error that can be caught using a try...catch block.

// use this promises inside async function because when you call that async function to consume this promises it will not get you expected output because the timer is already started when the script started executing not after the async function called..
const vrindavanWeather = new Promise((resolve, reject)=>{
  setTimeout(()=>{
    resolve("18 deg");
  },4000);
});

const dwarkaWeather = new Promise((resolve, reject)=>{
  setTimeout(()=>{
    resolve("21 deg");
  },4000);
});


async function fetchWeather(){

  const vrindavanWeather = new Promise((resolve, reject)=>{
    setTimeout(()=>{
      resolve("18 deg");
    },4000);
  });
  console.log("Fetching Vrindavan Weather..");
  const w1 = await vrindavanWeather;
  
  console.log("Fetched Vrindavan Weather:",w1);

  const dwarkaWeather = new Promise((resolve, reject)=>{
    setTimeout(()=>{
      resolve("21 deg");
    },4000);
  });
  
  console.log("Fetching Dwarka Weather..");
  const w2 = await dwarkaWeather;
  console.log("Fetched Dwarka Weather:",w2);
  // console.log(w1, w2); 
  return [w1,w2];
}

fetchWeather()
.then((val) => console.log(val))

const chant = async () =>{
  console.log("Hare Krsna!");
}

chant(); // both async function fetchWeather and chant will executed parallelly

const main = async () =>{
  // we can control the parallelism of functions execution to step-by-step execution.
  const func1 = await fetchWeather();
  const func2 = await chant();
  // console.log(func1, func2);
}

setTimeout(main,10000);