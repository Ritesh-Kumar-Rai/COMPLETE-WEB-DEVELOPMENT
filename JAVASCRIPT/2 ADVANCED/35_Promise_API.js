// Promise API
// There are 6 static methods of Promise class:

/*
1. Promise.all(promises) – Waits for all promises to resolve and returns the array of their results. if any one fails, it becomes the error and all other results are ignored.

2. Promise.allSettled(promises) – Waits for all the promises to settle and returns their results as an array of objects with status and value.

3. Promise.race(promises) – Waits for the first promise to settle and its result/error becomes the outcome.

4. Promise.any(promises) – Waits for the first promise to fulfill (& not rejected), and its result becomes the outcome. Throws AggregateError if all the promises are rejected.

5. Promise.resolve(value) – Makes a resolved promise with the given value.

6. Promise.reject(error) – Makes a rejected promise with the given error.*/

const p1 = new Promise((resolve, reject)=>{
  setTimeout(()=>{
    resolve("Promise 1 resolved");
  },7000);
});

const p2 = new Promise((resolve, reject)=>{
  setTimeout(()=>{
    // resolve("Promise 2 resolved");
    reject(new Error("Oops! Something went wrong.."));
  },1000);
});

const p3 = new Promise((resolve, reject)=>{
  setTimeout(()=>{
    resolve("Promise 3 resolved");
  },2000);
});

// Promise.all()
// const promises = Promise.all([p1,p2,p3]);
// const promises = Promise.allSettled([p1,p2,p3]);
// const promises = Promise.race([p1,p2,p3]);
const promises = Promise.any([p1,p2,p3]);

promises
.then((result)=>{
  console.log(result);
  setTimeout(()=>console.log('Hare Krsna!'),2000);
})
.catch((err)=>{
  console.log(err); 
  console.log('error occured');
});