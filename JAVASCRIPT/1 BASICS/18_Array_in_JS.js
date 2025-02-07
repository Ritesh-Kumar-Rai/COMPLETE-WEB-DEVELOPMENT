// Array in JS

const arr = [1,2,3,4,5];
const arr2 = new Array(1,2,3,4,5);
// access array
console.log(arr, arr2);
console.log(typeof arr, typeof arr2);
console.log(arr[1], arr2[1]);
console.log(arr[-1]); //undefined because you can't access array with negative indexes
// but in case you want then we have one method called .at() which again used to access the array using index number; but you can also access by negative indexes like :
console.log("using .at() method: "+arr.at(-1));// 5
//  In negative indexes starts from -1 and go upto n; and negative indexes starts from backward direction 
// means assume we have array with a length 5 then arr[0] in negative is -5 and arr[4] in negative is -1
// Example:
console.log(`arr[0] : ${arr.at(0)} is arr[-5] : ${arr.at(-5)}`);
console.log(`arr[4] : ${arr.at(4)} is arr[-1] : ${arr.at(-1)}`);

// modifying array
let fruits = ["banana", "apple", "grapes", "strawberry"];
console.log(fruits[2]);
fruits[2] = "black grapes";
console.log(fruits[2]);


// traversal in array / Iterating in Array
console.log('------------');

// for of loop
console.log("for of loop");

for(const item of fruits){
  console.log(" "+item);
  // console.log(fruits[item]); // no we can't access the indexes
  
}

// same loop using general way
for(let i=0; i<fruits.length; i++){
  // console.log(fruits[i]);
}

// for in loop [in case we want indexes]
console.log("for in loop");
for(const index in fruits){
  console.log(" "+index); // indexes
  console.log(" "+fruits[index]); // to access values 
}

// [Note: Don't be confused with for..of and for..in loop; for..in (in) means index, using for..in we can get indexes ]

// forEach() method
console.log("forEach() method");

fruits.forEach(function(currItem, index, arr){
  console.log(`${currItem} ${index}`, arr);
});

// map() method
console.log("map() method");

const modified_arr = fruits.map((currItem, index, arr)=>{
  return `${index} -> ${currItem}`;
});

console.log(modified_arr);

// When to use forEach() and map();
// -> forEach() when you don't need to store data to new array
// -> map() because it returns value you can store it to new array variable

// How to insert,delete values in Array

// 1. push() it adds new data at last of array
console.log(fruits.push('guava')); // it returns total length after adding value
console.log(fruits);

// 2. pop() it removes the last element from array
console.log(fruits.pop()); // it returns the removed item
console.log(fruits);

// 3. unshift() it adds new value at begining of array
console.log(fruits.unshift("guava"));
console.log(fruits);

// 4. shift() it removes the data from begining of array
console.log(fruits.shift());
console.log(fruits);

// What if, we want to add and remove data from anywhere in array
// splice() method : Syntax -> splice(indexStart, deleteCount, item1, item2, itemN..)

console.log("---------------splice() method-------------");

//add element at any index
fruits.splice(2, 0, "tomato"); // 2 is index, 0 means nothing to delete, 3rd arg is value which will going to insert at 2nd index; and whatever exist at 2nd index will be shifted to next index; 
console.log(fruits);

// remove element
fruits.splice(2,1); // 2 is index number, and 1 means remove 1 element from 2nd index
console.log(fruits);
// the max number you pass as 2nd arg the max elements will be removed from provided index;

fruits.splice(-1,-1);// -1 means -1 index [last index] means nothing will deletes at index 0
console.log(fruits);
// fruits.splice(-1,1); // it deletes the last index
// console.log(fruits);

fruits.splice(-1,-1,"a"); // at index -1 nothing will be removed but inserted 'a' at the last index which causes last value to shift to next index [right side]
console.log(fruits);


// delete last second element and add's new fruit name instead of 'a'
fruits.splice(-2,1,"cherry"); // -2 means last second index (in positive index no. 3) removed that value first 'a' and add's 'cherry' at same index
console.log(fruits);

// ! Great [best suited for CART Functionality where we want to remove a cart by clicking on remove button]


// Searching in a Array

const numbers = [10,20,30,60,40,50,60,70];

// 1. indexOf() Method: The indexOf method returns the first index at which a given element can be found in the array, or -1 if it is not present.
// Syntax: indexOf(searchElement, fromIndex);
console.log('--------indexOf()-------');
console.log(numbers.indexOf(60)); // 3
console.log(numbers.indexOf(60,4));// find 60 starts searching from index 4 answer will be : 6
console.log(numbers.indexOf(30,4)); //find 30 starts searching from index 4 answer will be : -1


// 2. Includes() Method: The includes method checks whether an array includes a certain element returning true or false.
// Syntax: includes(searchElement, fromIndex)
console.log("-----includes()------");
console.log(numbers.includes(50)); // true
console.log(numbers.includes(5)); // false

// 3. lastIndexOf() Method: The lastIndexOf() method returns the last index at which a given element can be found in the array, or -1 if it is not present. The array is searched backward, starting at fromIndex.
// Syntax: lastIndexOf(searchElement, fromIndex)
console.log('--------lastIndexOf()---------');
console.log(numbers.lastIndexOf(60)); // 6
console.log(numbers.lastIndexOf(60,5)); // 3 bacause it searching to backward direction
console.log(numbers.lastIndexOf(60,7)); // 6

console.log(numbers.lastIndexOf(20)); // 1
console.log(numbers.lastIndexOf(80)); // -1


// Challenge Time
console.log("------Challenge Time-------");
const months = ["Jan", "march", "April", "June", "July"];
console.log(months);
// 1. Add Dec at the end of an array?
months.splice(months.length, 0, "Dec");
// other way is months.push("Dec");
console.log(months);

// 2. What is the return value of splice method?
// -> empty array []
console.log("splice() return value : ",months.splice());

// 3. Update march to March (update)?
const index_to_update = months.indexOf("march");
months.splice(index_to_update, 1, "March");
console.log(months);
// another way
// const existing_value = months[index_to_update];
// months[index_to_update] = "March";

// 4. Delete June from an array?
 months.splice(months.indexOf("June"), 1);
 console.log(months);


// Filtering and Searching in a Array 

//1. find Method: The find method is used to find the first element in an array that satisfies a provided testing function. It returns the first matching element or undefined if no element is found.
console.log("---------find method---------");

const find_result = months.find((currItem) => currItem === "July");
const find_result2 = months.find((currItem) => currItem === "June");
console.log(find_result, find_result2);
const find_result3 = numbers.find((item, index)=>{
    return item > 40
});
 
console.log(find_result3);

//2. findIndex Method: The findIndex() method of TypedArray instances returns the index of the first element in a typed array that satisfies the provided testing function. If no elements satisfy the testing function, -1 is returned.
console.log("-------findIndex--------");

const findIndex_result = months.findIndex(currItem => currItem === "July");
const findIndex_result2 = months.findIndex(currItem => currItem === "June");
console.log(findIndex_result, findIndex_result2);


// 3. filter Method: The filter method creates a new array with all elements that pass the test implemented by the provided functiion.
console.log("---------filter method--------");

const filter_result = numbers.filter((item)=>{
  return item > 30;
});
console.log(filter_result);

// USECASE: In E-commerce website we will use filter to remove or delete cart products
const CART = [122,128,78,132,67,106,2]; // CART contains id's of product which are added to cart
console.log('CART: ', CART);

const delete_product_id = 132;
const filtered_cart = CART.filter(product_id => product_id !== delete_product_id);
console.log(filtered_cart);


// Practice Time
console.log("-----Practice Time------");

// 1: Filtering Products by Price
const products = [
  { name: "Laptop", price: 1200 },
  { name: "Phone", price: 800 },
  { name: "Tablet", price: 300 },
  { name: "Smartwatch", price: 150 },
]; // Filter products with a price less than or equal to 500

products.filter((product)=>{
  if(product.price <= 500){
      console.log(product);   
  }
});

// 2: Filter unique values
const numbers2 = [...numbers, 30,20,30] // spread operator
console.log("Repeated numbers: "+numbers2);

// way 1
const unique_nums = numbers2.filter((num, index, arr)=>{
    const index2 = arr.indexOf(num);
    return (index2 === index);
});
console.log("1. Unique numbers: "+unique_nums);

// way 2
let temp_storage_arr = new Array();

const unique_nums2 = numbers2.filter((num)=>{
  if(!temp_storage_arr.includes(num)){
      temp_storage_arr.push(num);
      return num;
  }
});
console.log("2. Unique numbers: "+unique_nums2);

//* =========================================
//*  How to Sort and Compare an Array
//* =========================================
//? How to Sort and Compare an Array
//? Sorting an Array: The sort method sorts the elements of an array in place and returns the sorted array. By default, it sorts elements as strings.
console.log(fruits.sort());
console.log(numbers2.sort())


//? compare callback function
// syntax
// const sortedNumbers = numbers2.sort((a, b) => a - b);
// if(a>b) return 1  => switch the order
//  if(b>a) return -1  => keep the order


// For ascending order
// const sortedNumbers = numbers.sort((a, b) => {
//   if (a > b) {
//     return 1;
//   } else if (b > a) {
//     return -1;
//   }
// });

// for Descending Order
const sortedNumbers = numbers2.sort(function(a,b){
  if(a > b){
    return -1;
  }else if(b > a){
    return 1;
  }
});
console.log(sortedNumbers);

//* =========================================
//*  Very Important Array Methods
//* =========================================

//? Map(), Filter(), Reduce(),
// map() creates a new array from calling a function for every array element.
// map() does not execute the function for empty elements.
// map() does not change the original array.

// Practice Questions:

// 1. Using map to square each number and create a new array
const square_ans1 = numbers.map(num => num*num);
console.log(square_ans1);

// 2. Using the map method, write a function that takes an array of strings and returns a new array where each string is capitalized.
const capitalizedStr = fruits.map((each_str)=>{
  const arr_str = Array.from(each_str);
  arr_str.splice(0,1, arr_str[0].toUpperCase());
  return arr_str.join("");
  
});
console.log(capitalizedStr);

// 3: Using the map method, write a function that takes an array of numbers and returns a new array where each number is squared, but only if it's an even number.
const square_ans2 = [1,2,3,4,5].map((num)=>{
  if(num % 2 === 0){
    return (num * num); 
  }
}).filter((each_val) => each_val !== undefined); // chained methods
console.log(square_ans2);


// 4: Using the map method, write a function that takes an array of names and returns a new array where each name is prefixed with "Hare ".
const incomplete_mantra = ["Krsna", "Ram"];
const complete_mantra = incomplete_mantra.map((word)=>{
    const add = "Hare ";
    return (add+word);
});
console.log(incomplete_mantra, complete_mantra);

// Reduce method
// The reduce method in JavaScript is used to accumulate or reduce an array to a single value. It iterates over the elements of an array and applies a callback function to each element, updating an accumulator value with the result. The reduce method takes a callback function as its first argument and an optional initial value for the accumulator as the second argument.
// syntax
// array.reduce(function callback(accumulator, currentValue, index, array) {
//   // Your logic here
//   // Return the updated accumulator value
// }, initialValue);

// callback: A function that is called once for each element in the array.
// accumulator: The accumulated result of the previous iterations.
// currentValue: The current element being processed in the array.
// index (optional): The index of the current element being processed.
// array (optional): The array reduce was called upon.
// initialValue (optional): An initial value for the accumulator. If not provided, the first element of the array is used as the initial accumulator value.

const productPrices = [15990, 2560, 1200, 780, 200];
const total = productPrices.reduce((accumulator, value)=>{
  return accumulator+value;
},0);
console.log('₹'+total);

const productsCART = [
  {id: 123, product_name: "Samsung S25 Ultra", price: 115000},
  {id: 103, product_name: "Apple Iphone 16 Ultra Max", price: 175000},
  {id: 123, product_name: "Sony PS5 Pro", price: 55000}
];

// calculate total amount to pay
const sum = productsCART.reduce((acc, product)=> acc + product.price,0);
console.log("TOTAL AMOUNT TO BE PAID: ₹"+sum);

