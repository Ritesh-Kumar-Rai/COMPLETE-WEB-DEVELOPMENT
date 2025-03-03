// POST requests
/*
To make a POST request, we need to use fetch options

  1. method – HTTP-method, e.g POST
  2. body – the request body 
*/

/*
let response = await fetch(‘/url’,{
			method: ‘POST’,
			headers: {
				‘Content Type’: ‘application/json’
				},
			body: ‘{“a”: ”harry”}’
	});

let result = await response.json();
*/

class DataMissingError extends Error{
  constructor(message){
    super(message);
    this.name = "DataMissingError";
  }
};

const postTodo = async (todo_data) =>{
    try {

      if(!todo_data){
        throw new DataMissingError("Data not found!");
      }else if(Object.prototype.toString.call(todo_data) !== "[object Object]"){
        throw new DataMissingError("Object is expected but didn't get it!");
      }
      const options = {
        method: "POST",
        Headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(todo_data),
      };

      const promise = await fetch("https://jsonplaceholder.typicode.com/todos/", options);
      console.log(promise.ok, promise.status, promise.statusText);
      const response = await promise.json();
  
      return response;
    } catch (error) {
      console.log(`${error.name} -> ${error.message}`);
      throw error;
    }
};

async function app(todo) {
    postTodo(todo)
    .then((data_response)=>{
      console.log(data_response);
    }).catch((err)=>{
      console.log("Some Error occured!");
    });
}
console.log("please wait todo is saving...");

const todo = {
  title: "read bhagvad gita",
  body: "at 6'O clock complete 3rd chapter from verses 16 to 27",
  userId: 1101,
};


setTimeout(()=>app(todo), 1000);
