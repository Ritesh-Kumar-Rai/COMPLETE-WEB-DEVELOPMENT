// Fetch API
// fetch is used to get data over the network

// let promise = fetch(url, [options])    //without options, a get request is send
 

/*
Getting a response is a 2-stage process.

1. An object of Response class containing “status” & “ok” properties

    status – The http status code, Eg: 200

    ok – Boolean, true if the HTTP status code is 200-299

2. After that we need to call another method to access the body in different formats:

    response.text() – Read & return the text

    response.json() – parse the response as JSON 
    
Other methods include response.formData(), response.blob(), response.arrayBuffer() etc.
Note – We can use only one body reading method.

Example if we have already got the response with response.text() then response.json() won’t work.  
*/

// Response headers
// The response headers are available in response.headers

// Request headers
// To set a request header in fetch, we can use the headers option.
/*
let res = fetch(url, {
		headers: {
			Authentication: ‘Secret’
			}
		});
*/

fetch("https://randomuser.me/api/") // fetching data from api url
.then((response)=> {
  console.log(response.status);
  console.log(response.ok);
  return response.json();
})
.then((response)=>{
  // console.log(response.results);
})
.catch((err)=>{
  console.log(err.name);
  console.log(err.message);
});


async function fetchWeatherData(location_name = "Mathura"){
  try {
    const url = `https://wttr.in/${location_name}?format=4`;
    const response = await fetch(url);
    if(!response.ok || response.status !== 200){
        throw new Error("There is an issue while fetching data from url!");
    }
    console.log(response.ok, response.status);
    const data = await response.text();
    console.log(data);
  } catch (error) {
    console.log(`${error.name} : ${error.message}`);
  }
}

const location = "Vrindavan";
fetchWeatherData(location);