// Arithmetic Operators
// contains : + - * / %

console.log(5 + 6);
// many times we need to calculate some numbers then we use arithmetic operators

// Let's take a real life example: We have a cart which contains 2 items & we required to calculate total price to pay. Consider the following details to do so:-

/*
    1. Item PS4 Carry Bag
        - Initial Price = ₹2499
        - On Sale = 41% Off
        - Coupon Discount = ₹29
    
    2. Item PS4 pro 1TB
        - Initial Price = ₹15599  
        - On Sale = 10% Off
        - Coupon Discount = ₹272
        
    Other Charges:
        - Gift Wrap Charges = ₹25
        - Convenience Fee = ₹20
        - GST Tax = 18% 

    Now, calculate Total Price with or without GST Tax.        
*/

var summary = 2499 - 41/100 * 2499 - 29 + 15599 - 10/100 * 15599 - 272 + 25 + 20

console.log("Without GST:- "+summary);

// Order of Operations
/*
    - BODMAS or PEMDAS
    - BODMAS => Bracket Order Divide Add Substract
    - PEMDAS => Parenthesis Exponents Multiply + Divide  Add + Subtract
*/

summary = ((2499 - (41/100 * 2499) - 29) + (15599 - (10/100 * 15599) - 272) + 25 + 20) * 118/100;

console.log("With GST:- "+summary);


