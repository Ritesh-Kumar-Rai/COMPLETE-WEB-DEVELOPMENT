// In this codebase we will see how can we build and work with error chaining; and how to handle them

// defining the custom Error classes
class NetworkError extends Error{
  constructor(message){
    super(message);
    this.name = "NetworkError";
  }
};

class ProcessingError extends Error{
  constructor(message, data_packet){
    super(message);
    this.name = "ProcessingError";
    this.data_packet = data_packet;
  }
};

// Promise to fetch data via Network
const fetchData = async () =>{
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
      const randomData = Math.random();
      if(randomData < 0.5){
        reject(new NetworkError("Network Error! Something bad happened via fetching data online.."));
      }
      resolve({msg: "Data is fetched successfully.", data_packet: randomData});
    },5000);
  });
};

// Promise to process fetched data
const processData = async (data) =>{
  if(data === undefined || data === null){
    throw new TypeError("Parameter 'data' is required and cannot be undefined or null");
  }
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
      const processed_data_rate = Math.random() > 0.5;
      if(processed_data_rate){
        resolve(`The data ${data} is processed.`);
      }else{
        reject(new ProcessingError("The Error occured while processing the data",data));
      }
    },5000);
  });
}

// executing the promises

async function main() {
  try {
    console.log("Fetching data...");
    const data = await fetchData();
    console.log(data.msg);
    console.log("Processing Data...");
    const processed_data = await processData(data.data_packet);
    console.log(processed_data);
  } catch (error) { 
    if(error instanceof NetworkError){
      console.log(`${error.name} : ${error.message}`);
    }else if(error instanceof ProcessingError){
      console.log(`${error.name} : ${error.message} -> ${error.data_packet}`);
    }else{
      console.error(error.message);
    }
  }
};

console.log("Hare Krsna");

main();