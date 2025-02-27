// What's the alternative approch to avoid Callback Hell is Promises. 
// Here how can we use Promises and handle it

const p1 = new Promise((resolve, reject)=>{
  setTimeout(()=>{
    resolve("Promise resolved.");
  },2000);
});

p1
.then((value)=>{
  console.log(value);
  const p2 = new Promise((resolve, reject)=>{
    setTimeout(()=>{
      resolve(108);
    },2000);
  });

  return p2;
})
.then((value)=>{
  console.log(value);
  return 16;
})
.then((v)=>{
  console.log(v);
})
.finally(()=>{
  console.log("This is how we handle promise chaining which is good alternative from Callback Hell");
});

// The below example also explains how we can chain multiple promises to get done after one completion

const downloadFile = (source_url) =>{
  return new Promise((resolve, reject)=>{
      console.log("File is started downloading...");
      setTimeout(()=>{
        (source_url) ? resolve(true) : reject(false);
      },7000);
  });
};

const virusScanner = () =>{
  return new Promise((resolve, reject)=>{
    console.log("Scanning downloaded file!");
    setTimeout(()=>{
      const virusFound = Math.floor(Math.random() * 2);
      if(virusFound === 0){
        resolve("You are safe Now.");
      }else{
        reject(`Virus Found: ${virusFound}`);
      }
    },5000);
  });
}

downloadFile("https://www.download.llmmodel.ai/download")
.then((res)=>{
  console.log("Your file is downloaded successfully!");
  setTimeout(()=>{
    console.log("Starting the Virus Scanner...");
  },2000)
  return virusScanner();
})
.then((value)=>{
  console.log("Scan Result: ",value);
})
.catch((err)=>{
  if(err === false){
    console.log("The file is failed to download")
  }else{
    console.log(err);
  }
});