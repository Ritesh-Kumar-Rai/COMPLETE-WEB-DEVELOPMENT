// Class Inheritance
// Class Inheritance is a way for one class to extend another class. This is done by using the extends keyword.

// Parent Class ---> Child Class ---> SubChild Class  

// The extends keyword: extends keyword is used to extend another class.
// Syntax: Class class_name extends parent_class_name{}

class User{
  constructor(name, emailID){
    this.username = name;
    this.email = emailID;
    console.log('User created!');
  }

  login(){
    console.log(`${this.username} is just logged-in with ${this.email}`);
    // this.getInfo(); // here we can call internal member functions like this
  }

  logout(){
    console.log(`${this.username} is logged-out...`);
  }

  getInfo(){
    console.log(`username: ${this.username} \nemail ID: ${this.email}`);
  }

};

class Admin extends User{
  // Here the parent constructor function will auto invoked.
  login(){
    console.log(`${this.username} (Admin) is logged In.`);
  }

  deleteUser(){
    console.log(`${this.username} (Admin) deleted a user.`);
  }
};

const lorem = new User("ram", "jai.ram@iskcon.com");

lorem.login();
lorem.getInfo();
lorem.logout();
console.log("---------------------------");

const manager = new Admin("manager", "manager@iskcon.com");

manager.login();
manager.deleteUser();
manager.getInfo();