// Private Fields (Using #):

// The # symbol in JavaScript is used to define private fields within a class. Private fields are a way to encapsulate data and restrict direct access to it from outside the class. This ensures better data encapsulation and security.

class Account{
  // Define a private field
  #balance;

  constructor(naam = 'Hari Bhakt',initialBalance){
    this.name = naam;
    this.#balance = initialBalance; // Initialize the private field
  }

  // Public method to deposit money
  deposit(amount){
    if(amount > 0){
      console.log("depositing amount...")
      this.#balance += amount; // Accessing private field 

      // Accessing private method
      this.#printDepositMessage();
    }
  }

  // Public method to get the balance
  getBalance(){
    return this.#balance; // Accessing private field
  }
    
  // private method which is accessible only inside class
  #printDepositMessage(){
      setTimeout(()=>{
        console.log("Money has been deposited.. Thankyou!");
        setTimeout(()=>{
          console.log("Your current balance is:", this.#balance);
        },2000)
      },5000);
  }
  
};

// Why Not Use `this`:
// When you use #balance = 0;, you're defining a private field called #balance. This field is accessible only within the class itself and cannot be accessed directly from instances of the class. This is different from public fields, which are defined using this.

const user = new Account(undefined,25000);
const username = user.name;
console.log("Welcome,"+username+" to our Bank");

const balance = user.getBalance();
console.log("Your current balance is:", balance);

user.deposit(27780);
console.log(user.balance); // undefined
// user.printDepositMessage(); // Error aayega! cannot access private method from instance of class


/*
#Rules for Defining and Using Private Variables:

  1. Declaration: Private fields can only be declared within a class and must be preceded by the # symbol.

  2. Accessibility: Private fields cannot be accessed or modified from outside the class; doing so will result in a SyntaxError. This includes trying to access them via instance references.

  3. Scoping: Private fields are scoped to the class in which they are declared. They are not inherited by subclasses, meaning a subclass cannot access its superclass's private fields.

  4. Initialization: Field declared and initialized & Can be updated within the constructor

#Encapsulation Benefits

  1. Data Protection: Private variables help protect the state of an object from being altered directly from outside its class.

  2. Controlled Access: You can control how the internal state of an object is accessed and modified by using public methods (getters/setters).
  
  3. Maintainability: It improves maintainability and readability, as the internal workings of a class are hidden from the users of the class.  
*/