// Dynamic Method Dispatch
// Dynamic method dispatch is a mechanism by which a call to an overridden method is resolved at runtime rather than compile-time. It allows a method to be dynamically selected based on the runtime type of the object, enabling polymorphic behavior.

// In JavaScript, dynamic method dispatch is achieved through method overriding in class hierarchies.

class Krsna{
  avatar_name(){
    console.log("Origin Krsna God");
  }
};

class Narshimha extends Krsna{
  avatar_name(){
    console.log("Narshimha Avatar");
  }
}

class Shiv extends Krsna{
  avatar_name(){
    console.log("Shiv an Extended Form of Krsna");
  }
}

class Ram extends Krsna{
  avatar_name(){
    console.log("Ram Avatar");
  }
};

function DynamicMethodDispatch(instance_name){
    instance_name.avatar_name();
}

// creating objects [instances]
const origin = new Krsna();
const narsimha = new Narshimha();
const shiv = new Shiv();
const ram = new Ram();

DynamicMethodDispatch(origin);
DynamicMethodDispatch(narsimha);
DynamicMethodDispatch(shiv);
DynamicMethodDispatch(ram);

// or 
console.log("------------------------");

const avatars = [krishna,narsimha_dev, shivji, ramji] = [new Krsna(), new Narshimha(), new Shiv(), new Ram()];

avatars.forEach(godName => godName.avatar_name());

// Use Cases:

  // Polymorphic Behavior: Dynamic method dispatch allows for polymorphic behavior, enabling different objects to respond to the same method call in different ways.

  // Flexibility: It provides flexibility in designing systems where objects of different classes can be treated uniformly based on their common interface.