// switch statement in js

const day = "Sunday";

switch(day){
    case "Monday": 
      console.log("It's Monday Duty Time");
      break;

    case "Friday":
      console.log("Last day of Job, Finishing this week work");
      break;
      
    case "Saturday":
      console.log("Off duty, plan for next week and learn skill");
      break;

    case "Sunday":
      console.log("It's sunday, play some games and enjoy free day");
      break;

    default: console.log("Nothing to say!");
}

// Practice

/*Write a JavaScript switch statement that takes a variable areaOfShapes representing different shapes, and based on its value, calculates and logs the area of the corresponding shape. Consider three shapes: 'Rectangle,' 'Circle,' and 'Square.' For 'Rectangle,' use variables a and b as the sides; for 'Circle,' use a variable r as the radius; and for 'Square,' use variable a as the side length. If the provided shape is not recognized, log a message saying, 'Sorry the shape is not available.' Test your switch statement with areaOfShapes set to 'Square' and sides a and b set to 5 and 10, respectively. Ensure that the correct area (25 in this case) is logged to the console.*/

const areaOfShape = "square";
const a = 5;
const b = 10;
let result;
switch (areaOfShape) {
  case 'square':
    result = a*a;
    console.log("Area of Square is "+result);
    break;

  case "rectangle":
    result = a*b;
    console.log("Area of Rectangle is "+result);
    
  case "circle":
    const radius = 2;
    result = (Math.PI).toFixed(2) * (radius * radius);
    console.log("Area of Circle is "+result);
    
  default:
    console.log("No shape matched!");
}