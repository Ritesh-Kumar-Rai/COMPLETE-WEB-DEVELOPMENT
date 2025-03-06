// * Inheritance Method Overriding and super keyword in OOP

// Method Overriding
// If we create our own implementation of run, it will not be taken from the Animal class. This is called Method Overriding.

// super keyword
// When we override a method, we don’t want the method of the previous class to go in vain. We can execute it using super keyword.

class Employee{
  constructor(name){
    this.name = name;
  }

  login(){
    console.log(`${this.name} is loggedIn`);
  }

  logout(){
    console.log(`${this.name} is logging out.`);
    setTimeout(()=>{
      console.log(`${this.name} is loggedOut.`);
      setTimeout(()=>{
        console.log("Hare Krsna.");
      },2000);
    },5000);
  }

  requestLeaves(leaves = 1){
      console.log(`Employee has requested ${leaves} leaves - Approved.`);
  }
};

class Programmer extends Employee{
  constructor(name, task){
    super(name); // in case you have implemented constructor to derived class then you must call parent constructor by using super()
    console.log(`Hare Krsna, You have a Task '${task}' today.`)
  }

  requestCoffee(qty=1){
    console.log(`${this.name} has requested ${qty} Coffee.`);
  }

  // @Override method
  requestLeaves(leaves=1){
    super.requestLeaves(leaves); // we need to tell to super which method to call
    console.log(`We have extended your leaves by 1, total = ${leaves+1}`);
  }
};

const aiden = new Programmer("Aiden Pearce", "Fixing Bug on Server Side DB calls");

aiden.login();
aiden.requestCoffee(2);
aiden.requestLeaves(3);
aiden.logout();
