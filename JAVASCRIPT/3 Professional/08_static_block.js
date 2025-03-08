//? Static Block

// A static block in a JavaScript class is a way to execute static initialization logic when the class itself is loaded. Static blocks allow you to run a block of code that's associated with the class, and it's executed at the time the class is defined, rather than being tied to any instance of the class.

class MathBundler{
  static Pi;

  static{
    MathBundler.Pi = 3.14;
    console.log("Math Bundler is loaded.");
  }

  static getRandom(count=0, isFloor = false){
    return (isFloor) ? Math.floor((Math.random() * count)+1) : (Math.random() * count) +1;
  }
};

console.log(MathBundler.Pi);
console.log(MathBundler.getRandom(10,true));