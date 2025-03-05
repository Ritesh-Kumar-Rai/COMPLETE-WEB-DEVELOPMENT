# Object Oriented Programming (OOP) in JavaScript

## 1. Object-Oriented Programming (OOP)
OOP is a programming paradigm centered around objects. It leverages objects to model real-world entities, making code more modular, flexible, and easier to manage.

## 2. Is JavaScript Object-Oriented?
To determine if JavaScript is object-oriented, we need to understand the difference between OOP and prototype-based programming.

  * `Object-Oriented Programming (OOP)`: Involves creating classes and instances (objects) from these classes.

  * `Prototype-Based Programming`: Involves deriving objects from existing objects.

According to MDN Docs, prototypes allow JavaScript objects to inherit features from one another. JavaScript primarily employs prototype-based programming, and the class keyword is syntactic sugar over prototypes, giving it an OOP-like appearance.


## 3. Object
An `object` is a collection of properties and methods. Properties define the state (data) of the object, while methods define its behavior (functions).

```javascript
const car = {
  make: 'Tesla',
  model: 'Model S',
  year: 2022,
  start: function() {
    console.log('Car started');
  }
};

car.start(); // Output: Car started
```

## 4. Why Use OOP
OOP helps in organizing and structuring code efficiently. It offers benefits like reusability, scalability, and maintainability. Here are some reasons to use OOP:

* Modularity: Code can be divided into reusable objects.

* Encapsulation: Data and methods are bundled together.

* Inheritance: Objects can inherit properties and methods from other objects.

* Polymorphism: Objects can take on different forms based on context.

## 5. Parts of OOP
Let's explore the key parts of OOP in JavaScript:

### Object Literal
A simple way to create objects using curly braces {}:
```javascript
const person = {
  name: 'Shahrukh',
  age: 30,
  greet: function() {
    console.log('Hare Krsna, I am ' + this.name);
  }
};

person.greet(); // Output: Hare Krsna, I am Shahrukh
```

### Constructor Function
A function used to create objects with the new keyword:
```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}

const person1 = new Person('Akshay', 25);
console.log(person1.name); // Output: Akshay
```

### Prototypes
Every JavaScript object has a prototype, which allows sharing properties and methods among instances:
```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.greet = function() {
  console.log('Hare Krsna, I am ' + this.name);
};

const person1 = new Person('Ajay', 25);
person1.greet(); // Output: Hello, I am Ajay
```

### Classes (ES6 Syntax)
A more modern and cleaner way to create objects and handle inheritance:
```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log('Namaste, I am ' + this.name);
  }
}

const person1 = new Person('Shahrukh Khan', 25);
person1.greet(); // Output: Namaste, I am Shahrukh Khan
```

### Instances (new, this)
* `new`: Creates an instance of an object.

* `this`: Refers to the current instance of the object.
```javascript
const person1 = new Person('Ram Das', 25);
console.log(person1.name); // Output: Ram Das
```

## 6. The 4 Pillars of OOP

### Abstraction
Hiding the complex implementation details and showing only the necessary features of an object.
```javascript
class Vehicle {
  constructor(type) {
    this.type = type;
  }

  start() {
    console.log(this.type + ' is starting');
  }
}

const car = new Vehicle('Car');
car.start(); // Output: Car is starting
```

### Encapsulation
Bundling data and methods that operate on the data within a single unit (class). It also involves restricting direct access to some of an object's components.
```javascript
class BankAccount {
  #balance = 0; // Private property

  deposit(amount) {
    this.#balance += amount;
    console.log('Deposited:', amount);
  }

  getBalance() {
    console.log('Balance:', this.#balance);
  }
}

const myAccount = new BankAccount();
myAccount.deposit(100);
myAccount.getBalance(); // Output: Balance: 100
```

### Inheritance
A mechanism where one class inherits the properties and methods of another class.
```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(this.name + ' makes a sound');
  }
}

class Dog extends Animal {
  constructor(name){
    super(name);
  }
  speak() {
    console.log(this.name + ' barks');
  }
}

const dog = new Dog('Buddy');
dog.speak(); // Output: Buddy barks
```

### Polymorphism
The ability of different objects to respond, each in its own way, to identical messages (methods).
```javascript
class Bird {
  speak() {
    console.log('Bird chirps');
  }
}

class Parrot extends Bird {
  speak() {
    console.log('Parrot talks');
  }
}

const bird = new Bird();
const parrot = new Parrot();

bird.speak(); // Output: Bird chirps
parrot.speak(); // Output: Parrot talks
```

#

## Fundamental Concepts

  ### 1. Objects
  * Properties
  * Methods

  ### 2. Classes
  * Class Declaration
  * Class Expression

  ### 3. Constructors
  * Constructor Functions
  * Class Constructors


#
## Key OOP Principles

  ### 1. Encapsulation
  * Private Fields (#)
  * Getters and Setters

  ### 2. Inheritance
  * extends Keyword
  * super() Keyword

  ### 3. Polymorphism
  * Method Overriding
  * Dynamic Method Dispatch

  ### 4. Abstraction
  * Abstract Classes (Conceptual, as JavaScript doesn't support true abstract classes)
  * Interfaces (Conceptual, as JavaScript doesn't support interfaces natively)

#
## Advanced Topics  

  ### Prototypes
  * Prototype Chain
  * `__proto__` and `prototype` 
  * Prototype Inheritance

  ### Modern ES6+ Conecepts
  * Static Methods