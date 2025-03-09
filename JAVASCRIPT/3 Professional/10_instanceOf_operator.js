// instanceof Operator

// The instanceof Operator allows to check whether an object belongs to a certain class

// The syntax is:

{/* <obj> instanceof <class> */}

// It returns true if obj belongs to the Class or any other class inheriting from it.

class User{
  constructor(name,age = 12){
    this._name = name;
    this._age = age;
  }

  // getter to access _name property
  get name(){
    return this._name;
  }

  set name(naam){
    if(naam.length < 3){
      throw new RangeError("name range must be greater than 2!");
    }
    this._name = naam;
  }

  get age(){
    return this._age;
  }

  set age(age=1){
    if(age < 1) throw new RangeError("Age not be in negative!");
    this._age = age;
  }

};

class Enterpreneur extends User{
  introduce(){
    console.log(`Hare Krsna, ${this._name} you are now ${this._age} old`);
  }
};

const ritesh = new Enterpreneur("Ritesh Kumar Rai", 17);

ritesh.introduce()
console.log(ritesh instanceof Enterpreneur); // true
console.log(ritesh instanceof User); // true
console.log(ritesh instanceof Object); // true
console.log(ritesh instanceof Array); // false
console.log(ritesh instanceof String); // false

const obj = {
  brand: "Indian",
  born: Infinity
};
console.log('---------------')
console.log(obj instanceof User);// false
console.log(obj instanceof Object); // true

// Note: Behind the scene Class is an object
console.log("Is object.property which is number is instanceOf Number: ", ritesh.age instanceof Number, typeof ritesh.age);

// here we got false why? is because the number is primitive data type and instanceof checks whether an object is instance of a speific constructor

// like:
const num = new Number(20);
const num2 = 56;
console.log(num instanceof Number); // returns true
console.log(num2 instanceof Number); // returns false