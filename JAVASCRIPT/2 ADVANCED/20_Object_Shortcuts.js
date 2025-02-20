// Object Shortcuts

// 1. Destructuring: Extract properties from objects easily.

/*const product = {
  brand: "Sony",
  model_name: "Play Station 5",
  price: 55000,
  disc_type: "SSD",
  disc_size: "1TB"
};

const { brand } = product;
console.log(brand);

// We can extract more than one property at once.

const { model_name, price, disc_size} = product;

console.log(model_name, price, disc_size); 

// we can also rename variable's name
const { model_name : name } = product;
console.log(name);
*/

// 2. Property Shorthand

const memoryType = "SSD";
const memorySizeType = "TB";
const memorySize = 2;
const disc_size = memorySize + memorySizeType;

const product = {
  brand: "Sony",
  model_name: "Play Station 5",
  price: 55000,
  disc_type: memoryType,
  disc_size
};

console.log(product);

// 3. Method Shorthand: Define methods directly inside the object without the function keyword.

/*const student = {
  name: "Ritesh Rai",
  age: 17,
  grades: {
    math: 90,
    science: 85,
    history: 88,
  },
  findTopSubject: function(){
    const entries = Object.entries(this.grades);
    const topSubject = entries.reduce((highest, current) => {
      return current[1] > highest[1] ? current : highest;
    });
    return topSubject[0];
  }
};*/

// is same as 
const student = {
  name: "Ritesh Rai",
  age: 17,
  grades: {
    math: 90,
    science: 85,
    history: 88,
  },
  
  findTopSubject(){
    const entries = Object.entries(this.grades);
    const topSubject = entries.reduce((highest, current) => {
      return current[1] > highest[1] ? current : highest;
    });
    return topSubject[0];
  }
};
console.log(student.findTopSubject());