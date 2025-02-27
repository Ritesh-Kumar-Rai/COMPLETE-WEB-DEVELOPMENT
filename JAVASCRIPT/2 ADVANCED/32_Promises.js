//* ==========================================
//*  Promise in JavaScript
//* ==========================================

//? A promise in JavaScript is an object that represents the eventual completion or failure of an asynchronous operation. It allows you to handle asynchronous operations more easily and cleanly by providing a way to write asynchronous code that looks synchronous.

//todo 👉 In simpler terms, a promise is like a placeholder for the result of an asynchronous operation. Or A container for the future result or value.

//* It can be in one of three states:

//? Pending: Initial state, neither fulfilled nor rejected.
//* Fulfilled(Resolved): The operation completed successfully.
//! Rejected: The operation failed or encountered an error.

//? Promises have built-in methods like then and catch to handle the results of asynchronous operations when they complete or encounter errors, making it easier to write asynchronous code that is more readable and maintainable compared to traditional callback-based approaches.

//* ==========================================
//* Using the Promise Constructor (Class):
//* ==========================================

//? You can create a promise using the Promise constructor. This involves creating a new instance of the Promise class, which takes a function as an argument. This function, often referred to as the "executor function," takes two parameters: resolve and reject. You call resolve when the asynchronous operation is successful and reject when it encounters an error.

//* real life example

//todo  1:  default state is pending

//todo 2:  Promise Made:  Your friend promises to call you after 2 days at 6 pm. This is similar to creating a promise in JavaScript.

//todo 3:  Pending Stage:  During the 2-day period, you're in a "pending" stage. You're not sure whether your friend will fulfill the promise (call you) or break the promise (not call you). Similarly, when you create a promise in JavaScript, it starts in a pending state until it either resolves (fulfills) or rejects.

//todo 4: Resolution at a Specific Time:  After 2 days and exactly at 6 pm, you'll know whether the promise is fulfilled (resolved) if your friend calls you, or if it's broken (rejected) if your friend doesn't call. This aligns with the idea that promises in JavaScript resolve or reject, often triggered by asynchronous operations, at a specific point in time.

//* ==========================================
//* 2: Using a Function (Promise Wrapper):
//* ==========================================

//? You can also create a promise by defining a function that returns a promise. This function usually encapsulates some asynchronous operation. Inside this function, you manually create a promise and resolve or reject it based on the result of the asynchronous operation.

// syntax
// function myPromiseFunction() {
//   return new Promise((resolve, reject) => {
//     // Asynchronous operations here
//     // If successful, call resolve(value)
//     // If there's an error, call reject(error)
//   });
// }

const getData = new Promise((resolve, reject)=>{
  setTimeout(()=> resolve("Hare Krsna!"),2000);
});

// we use .then() and .catch() for promise resolve or for promise rejection lastly .finally() is optional
getData.then((response)=>{
  // console.log(response);
}).catch((error)=>{
  console.log(error);
});

// 1: By default promise has the pending state
// 2: the moment we use setTimeout, we need to handle promises, we can do using then and catch

/*new Promise((resolve,reject)=>{
  setTimeout(()=>{
    const random = (Math.random() * 10) > 5; // true/false based on condition
    (random) ? resolve("Success") : reject("Failed to perform operation");
  },1000);
})
.then((res)=> console.log(res))
.catch((rejection_msg) => console.log(rejection_msg))
.finally(()=> console.log("Promise is done.."));*/

// Let's create a function which returns async promise

const verifyUser = (username, email, password) =>{
  return new Promise((resolve, reject)=>{
    console.log("checking credentials...");
    setTimeout(()=>{
      if(!username){
        reject("username is not defined!");
      }else if(!email || email !== "user@lorem.com"){
        reject("email id is incorrect or undefined!");
      }else if(!password || password !== "lorem_user"){
        reject("Oops! password is not correct or undefined");
      }
      resolve(true);
    },5000);
  });
}

function userRegistration(username, email, password){
  return new Promise((resolve, reject)=>{
    console.log("please wait.. verifying user");
        setTimeout(()=>{
              verifyUser(username, email, password)
              .then((res) =>{
                if(res){
                  setTimeout(()=>{
                    resolve("user loggedin successfully.");
                  },4000);
                }
              }).catch((e)=>{
                  reject(e);
              });
        },2000);
  });
}

// const user_status = userRegistration("epic", "user@google.com", 1234);
// const user_status = userRegistration("epic");
// const user_status = userRegistration("epic", "user@lorem.com", "lorem_user1");
const user_status = userRegistration("epic", "user@lorem.com", "lorem_user");


user_status
.then((response)=>{
  // console.log(response);
})
.catch((error)=>{
  // console.log(error);
})
.finally(()=>{
  // console.log("Thank you for using our portal.");
});


// Adding process.on("unhandledRejection", ...) helps catch any unhandled promise rejections globally and provides additional information for debugging.
//With this addition, you should be able to identify the source of the unhandled promise rejection more effectively.
process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at:", promise, "reason:", reason);
});


//* ==========================================
//* Promise Methods
//* ==========================================

//? Promise.all is used when you want to wait for all promises to complete successfully. Reject state will throw an error.

//? Promise.allSettled is used when you want to wait for all promises to complete, regardless of success or failure, and get information about their outcomes.

//? Promise.race is used when you are interested in the result of the first promise that completes, regardless of success or failure.

const promiseOne = new Promise((resolve, reject)=>{
  setTimeout(()=>resolve("Promise 1 resolved"),1000);
});

const promiseTwo = new Promise((resolve, reject)=>{
  setTimeout(()=>reject("Promise 2 is rejected!"),5000);
});

const promiseThree = new Promise((resolve, reject)=>{
  setTimeout(()=>resolve("Promise 3 resolved"),2000);
});

// handling all 3 promises using Promise.all()
/*Promise.all([promiseOne, promiseTwo, promiseThree])
.then((res)=>{
  console.log(res);
})
.catch((error)=>{
  console.log(error);
});*/

// handling all 3 promises using Promise.allSettled()
// Promise.allSettled([promiseOne, promiseTwo, promiseThree])
// .then((res)=>console.log(res))
// .catch((e) => console.log(e));

// handling all 3 promises using Promise.race()
Promise.race([promiseOne, promiseTwo, promiseThree])
.then((res) => console.log(res))
.catch((err) => console.log(err));