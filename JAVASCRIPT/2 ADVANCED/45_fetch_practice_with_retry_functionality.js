// Let's make an function with fetch() API which has advanced error handlig & retry mechanism..

// Custom Errors
class FetchError extends Error{
  constructor(message){
    super(message);
    this.name = "FetchError";
  }
};

class URLCapturingError extends Error{
  constructor(message){
    super(message);
    this.name = "URLCapturingError";
  }
};

async function fetchDataWithRetry(url, options={}, retries = 3) {
  const maxRetries = retries;

  if(!url || typeof(url) !== "string" || url.length < 5){
      throw new URLCapturingError("Oops! It seems like provided URL is not correct or missing..");
  }

  // Promise function for timeout
  const fetch_with_timeOut = async (url, options, time=5000) =>{
      return Promise.race([
        fetch(url,options),
        new Promise((_,reject)=>{
          setTimeout(()=> reject(new FetchError("Requested timed out!")), time);
        })
      ]);
  };

      for(let attempt = 1; attempt <= maxRetries; attempt++){
        try {
          const response = await fetch_with_timeOut(url, options);
  
          if(!response.ok){
                // Handle different status codes
                switch (response.status) {
                  case 400:
                      throw new FetchError('Bad Request!');
                  case 401:
                      throw new FetchError('Unauthorized!');
                  case 403:
                      throw new FetchError('Forbidden!');
                  case 404:
                      throw new FetchError('Not Found!');
                  case 500:
                      throw new FetchError('Internal Server Error!');
                  default:
                      throw new FetchError(`HTTP error! status: ${response.status}`);
              }
          }
  
          return await response.json();
        } catch (error) {
          if(attempt === maxRetries){
            console.error(`final attempt was failed : ${error.message}`);
            throw error;
          }

          console.warn(`${attempt} attempt failed: ${error.name} -> ${error.message}. retrying...`);

          await new Promise((resolve)=>{
            setTimeout(resolve, Math.pow(2, attempt) * 4000)
          });
        }
      }
}

console.log("Please wait fetching data...");

const url = "https://jsonplaceholder.typicode.com/todos/1";


setTimeout(async()=>{
  try {
    const result = await fetchDataWithRetry(url);
    console.log(result);
    console.log("data fetched successfully.");
  } catch (error) {
    console.log(`${error.name} -> ${error.message}`);
  }
},3000);