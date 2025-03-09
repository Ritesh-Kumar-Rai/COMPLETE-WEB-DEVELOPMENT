// getters and setters are used to get and set a property of a Class

/*
In JavaScript, getters and setters are special methods that allow you to define how a certain property behaves when it is accessed or modified. This is particularly useful for encapsulating properties, providing controlled access, or computing a property value dynamically.

Understanding Getters and Setters
  1. Getters are methods that get the value of a specific property.
  2. Setters are methods that allow you to set the value of a specific property.

  Both are defined using the get and set keywords. They can be used with class properties to create a more controlled interface to your objects.
*/

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

  introduce(){
    console.log(`Hare Krsna, ${this._name} you are now ${this._age} old`);
  }
};

const ritesh = new User("Ritesh Rai", 17);

ritesh.introduce();
console.log(ritesh.name);
ritesh.name = "Avinash Rai";
console.log(ritesh.name);

ritesh.introduce();
console.log(ritesh.age);
ritesh.age = 19;
console.log(ritesh.age);
ritesh.introduce();