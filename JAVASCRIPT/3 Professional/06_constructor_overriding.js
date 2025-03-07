// Overriding Constructor
// With a constructor, things are a bit tricky/different. According to the specification, if a class extends another class and has no constructor, then the following empty constructor is generated

/*class Monkey extends Animal {
    // auto generated
    constructor (…args){
        super(…args);
    }
}
*/
// Happens if we don’t write our own constructor

// Constructors in inheriting classes must call super (…) and do it before using this.
// We can also use super.method() in a child method to call Parent Method.

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
    // this.task  = task; // not allowed
    // let _task = task; // allowed
    super(name);
    console.log(`Hare Krsna, You have a Task '${task}' today.`)
    // super.logout(); yes we can call parent class any method like this
  } // constructor overriding

  // we can access the parent class properties to this class like this.name 

  requestCoffee(qty=1){
    console.log(`${this.name} has requested ${qty} Coffee.`);
  }

  // @Override method
  requestLeaves(leaves=1){
    super.requestLeaves(leaves); // we need to tell to super which method to call
    console.log(`We have extended your leaves by 1, total = ${leaves+1}`);
  }
};

const aiden = new Programmer("Marcus Holloway", "Hacking CtOS");

aiden.login();
aiden.requestCoffee();
aiden.requestLeaves();
aiden.logout();