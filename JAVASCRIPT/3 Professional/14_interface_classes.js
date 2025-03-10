// Interfaces
// JavaScript does not have native support for interfaces, but you can achieve similar behavior using abstract classes or by simply documenting the expected methods and properties.

// Simulating Interfaces:
class Shape {
  // Method for calculating area
  area() {
      throw new Error("Method 'area()' must be implemented.");
  }
  
  // Method for calculating perimeter
  perimeter() {
      throw new Error("Method 'perimeter()' must be implemented.");
  }
}

// Implementing a Rectangle class based on the Shape interface
class Rectangle extends Shape {
  constructor(width, height) {
      super();
      this.width = width;
      this.height = height;
  }

  // Providing implementation for area
  area() {
      return this.width * this.height;
  }

  // Providing implementation for perimeter
  perimeter() {
      return 2 * (this.width + this.height);
  }
}

// Implementing a Circle class based on the Shape interface
class Circle extends Shape {
  constructor(radius) {
      super();
      this.radius = radius;
  }

  // Providing implementation for area
  area() {
      return Math.PI * this.radius * this.radius;
  }

  // Providing implementation for perimeter (circumference in this case)
  perimeter() {
      return 2 * Math.PI * this.radius;
  }
}

function calculatingSize(instanceObj){
  if(!(instanceObj instanceof Shape)){
    throw new Error("Object does not implement AnimalInterface!");
  }
  return [instanceObj.area(), instanceObj.perimeter()];
}

// Example usage
try {
  const rectangle = new Rectangle(5, 10);
  const [rectangleArea, rectanglePerimeter] = calculatingSize(rectangle);
  console.log(`Rectangle Area: ${rectangleArea}`); // Output: Rectangle Area: 50
  console.log(`Rectangle Perimeter: ${rectanglePerimeter}`); // Output: Rectangle Perimeter: 30

  const circle = new Circle(7);
  const [circleArea, circlePerimeter] = calculatingSize(circle);
  console.log(`Circle Area: ${circleArea}`); // Output: Circle Area: 153.93804002589985
  console.log(`Circle Perimeter: ${circlePerimeter}`); // Output: Circle Perimeter: 43.982297150257104
} catch (error) {
  console.error(error.message);
}

// Summary:
// Dynamic Method Dispatch: Allows method calls to be resolved at runtime based on the object's type, enabling polymorphic behavior.

// Abstract Classes: Classes that cannot be instantiated directly and contain abstract methods to be implemented by subclasses.

// Interfaces: Patterns to simulate interface behavior by defining expected methods and properties.