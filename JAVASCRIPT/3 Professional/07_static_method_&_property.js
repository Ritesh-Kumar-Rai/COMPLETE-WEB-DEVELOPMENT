// Static methods are used to implement functions that belong to a class as a whole and not to any particular object.
// Static methods are used to implement functions that belong to a class as a whole and not to any particular object.

class MathBundler{
  constructor(){
    this.info = "Math Bundler Class";
    console.log(this.info);
  }

  static Pi = 3.141578567856785678; 

  static getPi(){
    console.log("Accessing non-static property ---->",this.info); // we can't access non-static properties or methods from static method
    return this.Pi.toFixed(2);
  }

  static generateIt(count=0){
    return Math.random() * count;
  }// we can access static methods inside it's one Class methods 

  static randome(count){
    return Math.floor(MathBundler.generateIt(count) + 1)
  }
}

// We can directly access static Methods or Properties using it's className
console.log(MathBundler.Pi);
console.log(MathBundler.getPi());
console.log(MathBundler.randome(100));

const m = new MathBundler();
console.log(m.Pi); // undefined, because we can't access static properties or methods from instance of related class 

/*

Summary:

  1. Static methods are not tied to instance data and are used for utility purposes, factory methods, or class-level operations.
  
  2. You cannot access instance methods or properties within a static method because this refers to the class itself rather than any instance.
  
  3. They help organize code better and encapsulate functionality that does not rely on individual object state.


Key Takeaways:

  1. Static Methods are Class-Level: They belong to the class itself, not instances, which means they can be called without instantiation.

  2. No Instance State: Static methods and properties do not have access to instance-specific data (those defined by this in instance methods), which simplifies their use, especially for shared utility functions or operations.
  
  3. Potential for Memory Savings: By using static methods where applicable, you avoid the overhead of unnecessary instance creation, which can conserve memory when instances are not needed.
  
  4. Garbage Collection: While static methods themselves do not directly contribute to memory usage because they do not create instances, any temporary data used within a static method (like local variables) will be managed by JavaScript's garbage collector when they go out of scope.
*/