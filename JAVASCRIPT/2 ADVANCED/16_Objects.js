// Objects in JavaScript
//? Objects are a fundamental part of JavaScript, providing a way to group related data and functions together. In JavaScript, an object is a collection of key-value pairs, where each key is a string (or a symbol) and each value can be any data type, including other objects. Objects can have properties and methods, making them versatile for various use cases.

// Creating Objects:
//? There are several ways to create objects in JavaScript. The most common one is using object literals:

// Syntax: const obj_name = { key : value, ...}; key:value pair together called property

const product = {
  id: 1,
  product_name: "acer predator neo 16 2024",
  price: 1_45_000,
  brand: "Acer",
  processor: "Intel i7 14700HX",
  gpu: "RTX 4060 140W",
  display: "1440p"
};

const person = {
  name: "lorem",
  "last Name": "epsilum",
  age: 14,
  say: function(){
    console.log("Hare Krsna!");
  }
};

// Accessing Properties:
//? You can access object properties using dot notation or square bracket notation:
console.log(product.product_name);
console.log(person.name);
console.log(person['last Name']);
console.log(person);

// Adding and Modifying Properties:
//? You can add new properties or modify existing ones:
person.age = 21; // changing existing value
person["is Admin"] = false; // adding new property

console.log(person)

// Methods:
//? Methods in objects are functions associated with the object. They can be invoked using the same notation as properties:
person.say();

// Function vs Method in JS:
// Functions woh hote hai jisse hum directly js mai banate hai, but jab bhi hum koi function kisi bhi object ke andar banaye toh woh Method ho jata hai. Bus bolne ke liye!😉 acha class ke andar bhi functions hote hai usse bhi methods hi kaha jata hai.. future mai sikhenge😊

// We can add dynamic keys in an object: yes
// const employee_type_id = "Intern"+" ID";
// const employee_type_id = "Engineer "+"ID";
const employee_type_id = "Trainer "+"ID";

const employee = {
  [employee_type_id]: "A1234z67",
  name: "React User",
  jobRole: "React Developer",
  salary: 75000,
  getInfo: function(){
    console.log(`Hare Krsna, The ${employee_type_id} is ${employee[employee_type_id]} has name: ${employee.name}`);
  }
};

console.log(employee);
employee.getInfo();

// Data Modeling:
//? Data modeling is the process of creating a visual representation of either a whole information system or parts of it to communicate connections between data points and structures. The goal is to illustrate the types of data used and stored within the system, the relationships among these data types, the ways the data can be grouped and organized and its formats and attributes.

// Objects are excellent for modeling real-world entities. For instance, you might represent a car, a user, or a product as an object with properties like color, brand, username, etc.
// same as what we see above object `product`

const ps5Pro = {
  name: "PlayStation 5 Pro",
  releaseDate: "November 7, 2024",
  price: {
    USD: 699.99,
    GBP: 699.99,
    AUD: 1199
  },
  dimensions: {
    width: "15.2 in",
    height: "3.5 in",
    depth: "8.5 in"
  },
  storage: "2TB SSD",
  features: {
    graphics: "45% faster rendering, advanced ray tracing",
    resolution: "AI-enhanced 4K resolution with PlayStation Spectral Super Resolution",
    frameRate: "Supports 60Hz and 120Hz displays",
    connectivity: "Wi-Fi 7",
    backwardsCompatibility: "Plays over 8,500 PS4 games with enhanced performance",
    controller: {
      name: "DualSense",
      features: ["Haptic feedback", "Adaptive triggers"]
    }
  }
};

// Yes, objects can have nested objects and properties