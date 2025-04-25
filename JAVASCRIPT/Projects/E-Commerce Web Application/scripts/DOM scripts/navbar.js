//  importing modules
import CartController from "../CartController.js" 
 
 // JS for Navbar Menu Bar Handling
 const navElem = document.querySelector("nav");
 const togglerOpenBtn = document.getElementById("menu-toggler-open-btn");
 const togglerCloseBtn = document.getElementById("menu-toggler-close-btn");


 // attaching event listener to togglerOpenBtn
 togglerOpenBtn.addEventListener('click',()=>{
   navElem.style.display = "block";
   setTimeout(()=>{
     navElem.style.left = "0%";
     navElem.style.opacity = "1";
   },200)
 });

 togglerCloseBtn.addEventListener('click', ()=>{
   navElem.style.left = "-100%";
   navElem.style.opacity = ".5";
   // setTimeout(()=> navElem.style.display = "none",200);
 });

 // Code for Haptic Feedback
function HapticOn(isLongEffect = false) {

  if ('vibrate' in navigator) {
    navigator.vibrate(100);

    if (isLongEffect) {
      navigator.vibrate([40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40]); // tick-tick-tick effect
    }

  }

}


// Code for CART class instantiation
const nav_cart_count_element = document.getElementById("navbar-go-to-cart-btn").lastElementChild;
console.warn(nav_cart_count_element);

// creating an instance of CartController class
let cartObj; // a global variable for storing instance of CartController;

try {
  cartObj = new CartController(nav_cart_count_element);
  setTimeout(()=>{
    cartObj.add_product_to_CART(2, document.querySelector('span'));
  },5000)
} catch (error) {
  console.error(`${error.name} -> ${error.message}`);
  console.error(error.stack);
}