// We can Chain Errors by using cause property in either Custom Error or Directly from catch() block to Error Class

// 1. using Custom Error Classes
class NetworkError extends Error{
  constructor(message,options){
      super(message,options);
      this.name = "NetworkError";
  }
};

class ProcessingError extends Error{
  constructor(message,data,options){
      super(message,options);
      this.name = "ProcessingError";
      this.data = data;
  }
};

const fetchData = async() =>{
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      const data = Math.random();
      const success = data < 0.5;
      if(success){
        resolve({msg:"Data Fetched successfully", data});
      }else{
        reject(new NetworkError("Failed! data isn't fetched.", {cause: new Error("Network underlying issue")}));
      }
    },3000);
  });
};

const processData = async(data) =>{
  if(data === undefined || data === null || data === NaN){
    throw new ReferenceError("Cannot get 'data' parameter!",{cause: new Error("Data is missing!")});
  }

  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      const process_success_rate = Math.random() < 0.5;
      if(process_success_rate){
        resolve("Data processed successfully "+data);
      }else{
        reject(new Error("Failed to process data!", { cause: new Error("Invalid data format.") }));
      }
    },5000);
  });
};


async function main() {
  try {
    const data = await fetchData();
    console.log(data.msg);
    const processed_data = await processData(data.data);
    console.log(processed_data);
  } catch (some_error) {
    if(some_error instanceof NetworkError){
        console.log(`${some_error.name} : ${some_error.message}`);
        if(some_error?.cause) console.log(some_error?.cause?.message);
        
    }else if(some_error instanceof ProcessingError){
        console.log(`${some_error.name} : ${some_error.message}`);
        if(some_error?.cause) console.log(some_error?.cause?.message);
    
    }else{
        console.log(`${some_error.name} : ${some_error.message}`);
        console.log(some_error?.cause?.message);
    }
  }
};

console.log("Fetching data...");
// main();



// 2. By throwing cause error directly from catch block

class ChantingError extends Error{
  constructor(message, rounds = 0){
    super(message);
    this.name = "IncompleteChantingError";
    this.rounds = rounds;
  }
}

const verifyChantingRounds = async (completedRounds = 0) =>{
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      if(completedRounds < 16){
        reject(new ChantingError("Chanting Not Completed!", completedRounds));
      }else{
        resolve({
          message: "Hari Bol! Chanting is Completed.",
          completed_rounds: completedRounds,
          target: 16,
          type: "rounds/japa",
        });
      }
    },4000);
  });
};

async function submitChantData(japaCompleted){
  try {
    
    const response = await verifyChantingRounds(japaCompleted);
    console.log(response);
  } catch (error) {
    console.log(`${error.name} : ${error.message}`);
    const newError =  new Error("try to chant 16 rounds daily",{cause: error,});
    // here i am explicitly assigning the nested object to newError variable because new Error() will not auto adds nested object.
    newError.info = {
        mantra: "Hare Krsna Mahamantra",
        completed_rounds: error.rounds,
        target: 16,
        remained: (16 - error.rounds) || 0
    };
    throw newError;
  }
};


(async()=>{
  try {
    const rounds_completed = 20;
    await submitChantData(rounds_completed);
  } catch (error) {
    console.log(error.message);
    console.log(error?.cause?.message);
    console.log(error?.info);
  }
})();

// Here we have learnt more about Error Chaining and cause property of Error Class. Hari Bol.