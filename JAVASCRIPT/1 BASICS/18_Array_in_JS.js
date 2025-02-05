// Array in JS

const arr = [1,2,3,4,5];
const arr2 = new Array(1,2,3,4,5);
// access array
console.log(arr, arr2);
console.log(typeof arr, typeof arr2);
console.log(arr[1], arr2[1]);

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

// 1. indexOf() Method: The indexOf method returns the first index at which a given element can be found in the array, or -1 if it is not present.
// Syntax: indexOf(searchElement, fromIndex);

// 2. Includes() Method: The includes method checks whether an array includes a certain element returning true or false.
// Syntax: includes(searchElement, fromIndex)

// 3. lastIndexOf() Method: The lastIndexOf() method returns the last index at which a given element can be found in the array, or -1 if it is not present. The array is searched backward, starting at fromIndex.
// Syntax: lastIndexOf(searchElement, fromIndex)
 



