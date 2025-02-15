/*Question:

Give discount based on age, gender for metro ticket:
  - Females get 50% off- Kids under 5 years of age are free
  - Kids up to 8 years have half ticket
  - People Over 65 years of age only pay 30% of the ticket
  - In case of multiple discounts max discount will apply.
*/
console.log('**** Metro Ticket Discount Calculator ****');

const gender = String("female");
const age = 5;
let discount = new Number(0);

function CalculateDiscount(age = 18){
  let calc_discount = 0;
  if(age <=5){
    calc_discount = 100;
  }else if(age > 5 && age <= 8){
    calc_discount = 50;
  }else if(age > 65){
    calc_discount = 30;
  }

  return calc_discount;
  // return ((age > 65) ? calc_discount = 30 : calc_discount);
}

console.log(gender);

switch (gender) {
  case "male":
    discount = CalculateDiscount(age);
    // Result
    console.log("Discounted Ticket: ",discount+"%");
    break;

  case "female":
    // Females got 50% instant discount
    const age_discount = CalculateDiscount(age);
    /*if(!extra_discount_calc === 50 || extra_discount_calc > 50){
        discount = extra_discount_calc;
    }  OR*/
    discount = Math.max(50, age_discount);    
    // Result
    console.log("Discounted Ticket: ",discount+"%");
    break;

  default:
    console.log("It might be your gender is not male/female!");
    break;
}

