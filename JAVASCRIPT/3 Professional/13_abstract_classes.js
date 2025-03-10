// Abstract Classes
// An abstract class is a class that cannot be instantiated directly and is meant to be subclassed. It often contains abstract methods that must be implemented by subclasses.

// However JS does not support direct abstract classes but we can achieve similar behaviour using certain patterns and techniques

// Custom Error
class AbstractClassError extends Error{
  constructor(message){
    super(message);
    this.name = "AbstractClassError";
  }
};


// Simulating Abstract Classes:
class Phone{
  constructor(name, model){
    if(new.target === Phone){
      throw new AbstractClassError("Cannot instantiate abstract class AbstractPhone directly");
    }

    // check is turnedOn method is implemented by subclass
    if(typeof this.turnedOn !== 'function' || this.turnedOn === Phone.prototype.turnedOn){
        throw new AbstractClassError("Abstract method 'turnedOn' must be implemented by subclass");
    }
    
    this.brand = name;
    this.model = model;

  }

  turnedOn(){
    throw new AbstractClassError("Abstract method 'turnedOn' must be implemented by subclass");
  }
};

class SimplerPhone extends Phone{
  // turnedOn(){ console.log("phone is turning on.."); }
};

class SmartPhone extends Phone{
  // @Override
  turnedOn(){
    console.log(this.brand,this.model,"SmartPhone is turning on..");
  }
};

try {
  const phoneObj = new Phone(); 
} catch (error) {
  console.log(`${error.name} -> ${error.message}`);
}


try {
  const phoneObj = new SimplerPhone(); 
} catch (error) {
  console.log(`${error.name} -> ${error.message}`);
}

try {
  const phoneObj = new SmartPhone("Samsung", "S25 Ultra"); 
  phoneObj.turnedOn();
} catch (error) {
  console.log(`${error.name} -> ${error.message}`);
}