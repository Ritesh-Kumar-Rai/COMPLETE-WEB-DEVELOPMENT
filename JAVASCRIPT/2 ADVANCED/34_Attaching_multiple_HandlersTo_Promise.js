// We can attach multiple handlers to promise which do not share data with each other and they operate independently from each other..

const p1 = new Promise((resolve, reject)=>{
  setTimeout(()=>{
    resolve("The promise has been resolved.");
  },4000);
});

// One Handler
p1.then((val)=>{
  console.log(val);
});

// Second Handler
p1
.then(()=>{
  console.log("Hare Krsna! New world created.");
  return new Promise((resolve, reject)=>{
    setTimeout(()=> resolve("Time to Chant!"),3000);
  });
})
.then((val)=>{
  console.log(val);
})

// and so on..