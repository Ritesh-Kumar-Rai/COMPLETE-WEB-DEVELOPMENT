// FormData Object in js
// The FormData object is used to construct a set of key/value pairs representing form fields and their values. It is commonly used to send form data via AJAX requests.

//* Creating a FormData Object: we can create a FormData object in 3 ways

// 1. Form an HTML form element: Syntax[new FormData(form)]
// const formElement = document.querySelector('form');
// const form_data = new FormData(formElement);

// 2. Passing a submitter as 2nd argument: Syntax[new FormData(form, submitter)]
// const formElement = document.querySelector("form");
// const submitter = document.querySelector("#loginBtn"); or #RegisterBtn

// const form_data = new FormData(formElement,submitter);

// 3. Manually:
const form_data = new FormData(); // instanciate FormData() by calling through it's constructor

console.log(form_data, "Type -> ",typeof(form_data));

// Methods of FormData
// The FormData object has several useful methods:

// 1. append(name, value, fileName [optional]) Adds a new value to an existing key or creates a new key if it doesn't exist.
  form_data.append("username", "JSuser");
  form_data.append("email","jsloremuser.com");
  form_data.append("password", "**568@userAToZ");
  form_data.append("fav_game_name", "watchdogs");
  form_data.append("fav_game_name", "watchdogs 2");

// 2. set(name, value, fileName [optional]) Sets a new value for an existing key or creates a new key if it doesn't exist. Unlike append, it removes all previous values associated with the key.
  form_data.set("email", "js@lorem12user.js.com"); // upadated the email 
  // form_data.set('profile_picture', "image.jpg", "profile-picture"); // error, when you pass 3 arg. then you must pass 2nd arg as blob file
  const file = new File(["content"], "profile-picture.jpg", { type: "image/jpeg" });
  form_data.set('profile_picture', file, 'custom_filename.jpg');
  form_data.set("isAdmin", true);

// 3. has(name) Checks if a key exists in the FormData object.
      console.log(form_data.has("email"));
      console.log(form_data.has("name"));

// 4. get(name) Returns the first value associated with a given key.
      console.log("username:",form_data.get("username"));

// 5. getAll(name) Returns all the values associated with a given key.
      console.log("fav game :",form_data.getAll("fav_game_name"));

// 6. delete(name) Deletes a key/value pair by the name of the key.
      console.log(form_data.has('isAdmin'));
      form_data.delete('isAdmin');
      console.log(form_data.has('isAdmin'));

// some iteration methods:

// 7. entries() Returns an iterator of all key/value pairs.
      for(const pair of form_data.entries()){
        // console.log(pair);
      }

// 8. keys() Returns an iterator of all the keys.
      for(const key of form_data.keys()){
        // console.log(key);
      }
// 9. values() Returns an iterator of all the values.
      for(const value of form_data.values()){
        // console.log(value);
      }

// General Iteration
for(const [key,value] of form_data){
    console.log(`${key} -> ${value}`);
}      

// or 
form_data.forEach((item,index) => console.log(index+":", item)); // index is keyName and item is value
