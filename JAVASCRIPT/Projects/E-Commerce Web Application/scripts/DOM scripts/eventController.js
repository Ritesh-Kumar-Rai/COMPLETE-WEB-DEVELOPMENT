// Class for product Cards event controller like "DOM Manipulation"
import DOMError from "../Custom Errors/DOMError.js";
import WishlistController from "../WishlistController.js";
import RenderCards from "./RenderCards.js";

class eventController {

  #wishlistControllerObj;
  #productQtyArray = JSON.parse(sessionStorage.getItem("logoIpsum-product-quantity-data")) || []; // a class level variable which stores data of qty which user will change of any products, the structure is like [{product_id, qty}, ...]  

  constructor(targettedDOMElement, name_for_identification = "UNKNOWN CALLER", extras = {secondDom, arrays}, page_type = "home") {
    this.targettedDOMElement = targettedDOMElement;
    this.identity_name = name_for_identification;
    this.page_type = page_type;
    console.error(this.#productQtyArray)
    // check for DOM element param is correct or exists
    if (!targettedDOMElement) {
      throw new DOMError("Target Element Parameter is expected", "eventController Class Constructor");
    } else if (!(targettedDOMElement instanceof Element) || targettedDOMElement.nodeType !== 1) {
      throw new DOMError("The parameter [which is targeted DOM] is must be an HTML DOM element", "eventController Class Constructor");
    }
    
    // checking for an dom element which we will get from extras parameter
    const secondDom = extras?.secondDom || null;
    if (!secondDom) {
      throw new DOMError("The Second Element Parameter is expected", "eventController Class Constructor - extras obj");
    } else if (!(secondDom instanceof Element) || secondDom.nodeType !== 1) {
      throw new DOMError("The parameter [which is second DOM for Card Re-rendering] is must be an HTML DOM element", "eventController Class Constructor - extras obj");
    }

    // check for array is exists or not [mandatory for Cards Re-rendering when any changes made like wishlist, quantity, may be while added to cart]
    const arrayForCardRe_Rendering = extras?.arrays || null;
    if(!arrayForCardRe_Rendering){
        throw new DOMError("Array param for cards Re-rendering is Required!", "eventController Class Constructor - extras obj");
      }else if(!(arrayForCardRe_Rendering instanceof Array) && Object.prototype.toString.call(arrayForCardRe_Rendering) !== "[object Array]"){
      throw new DOMError(`Array data type expected but got ${typeof(arrayForCardRe_Rendering)}!`, "eventController Class Constructor - extras obj");
    }

    this.arrayForCardRe_Rendering = arrayForCardRe_Rendering;
    this.secondDomElement = secondDom;

    this.#wishlistControllerObj = new WishlistController(); // creating instance of WishlistController Object to class level variable

    console.warn("eventController is Running\n", `Target Element is ${this.targettedDOMElement} for event listener\n`, "Identity Name: " + this.identity_name);

    this.#initEventListener();
  }

  #initEventListener() {
    console.log('initializing event listener...');

    this.targettedDOMElement.addEventListener("click", (e) => {
      // console.log(e.target, e);
      // we can use e.target.tagName or e.target.matches();
      const tagName = e.target.tagName;
      if (tagName === "I") {
        e.preventDefault();
        const parentElem = e.target.parentElement;
        try {
          this.#manageQty_n_wishlist(parentElem);
        } catch (error) {
          console.error(`${error.name} -> ${error.message}`);
          // console.error(error);
        }
      } else if (tagName === "BUTTON") {
        e.preventDefault();
        if (e.target.classList.contains("add-to-cart-btn")) {
          // ... further logic for add to cart button
          return;
        }
        try {
          this.#manageQty_n_wishlist(e.target);
        } catch (error) {
          console.error(`${error.name} -> ${error.message}`);
        }
      }
      // ---
    });
  }


  // function to increment/decrement quantity or add to wishlist functionality
  async #manageQty_n_wishlist(passedElement){
    
    if (passedElement.nodeType === 1 && passedElement instanceof Element) {
      const attribute = passedElement.getAttribute("data-type");
      // checking for null or undefined value
      if (!attribute) {
        throw new ReferenceError("We are failed to get Attribute: data-type");
      }

      const product_id_for_qty = parseInt(passedElement.parentElement.parentElement.parentElement.getAttribute("data-product-id")) || null;
      if(!product_id_for_qty){
        throw new ReferenceError("We are failed to get the product id for qty.. from product card.");
      }
      
      switch (attribute) {
        case "wishlist-btn":
          const productCardElem = (passedElement.parentElement.parentElement);
          const productId = parseInt(productCardElem.getAttribute("data-product-id")); // will implement error handling for this in future..
          console.log(this.#wishlistControllerObj.getWishlistData());
          if (passedElement.classList.contains("isWishlisted")) {
            console.log(this.#wishlistControllerObj.isAvailableInWishlist(productId));
            this.#wishlistControllerObj.remove_product_from_wishlist(productId);
            passedElement.classList.remove("isWishlisted");
            passedElement.innerHTML = `<i class="ri-heart-3-line"></i>`;
          } else {
            console.log(this.#wishlistControllerObj.isAvailableInWishlist(productId));
            this.#wishlistControllerObj.push_product_to_wishlist(productId);
            passedElement.classList.add("isWishlisted");
            passedElement.innerHTML = `<i class="ri-heart-3-fill"></i>`;
          }
          // console.log("arr->", this.#wishlistControllerObj.getWishlistData());
          break;

        case "minus":
          const inputElement = passedElement.nextElementSibling;
          let quantitylength = parseInt(inputElement.value) || 1;

          if (quantitylength === 1 || quantitylength < 2) {
            return;
          }

          if (!inputElement || inputElement.nodeType !== 1 || !(inputElement instanceof Element)) {
            throw new ReferenceError("Oops! We failed to target nextElement Sibling: reference -> manageQty_n_wishlist() function");
          }

          if (inputElement.tagName !== "INPUT" || !(inputElement.classList.contains("qty-input"))) {
            throw new TypeError("Aww! The target input tag of product card is not a type of `input` or does not have className called `qty-input`");
          }
          quantitylength--;
          inputElement.value = parseInt(quantitylength);
          await this.#saveQtyToSessionStorage(product_id_for_qty, quantitylength); // sending the product id and qty. count to this method to save it to session which will be used for Card Re-rendering
          break;

        case "plus":
          const inputElement2 = passedElement.previousElementSibling;
          let quantitylength2 = parseInt(inputElement2.value) || 1;
          if (!inputElement2 || inputElement2.nodeType !== 1 || !(inputElement2 instanceof Element)) {
            // console.warn(inputElement2)
            throw new ReferenceError("Oops! We failed to target prevElement Sibling: reference -> manageQty_n_wishlist() function");
          }

          if (inputElement2.tagName !== "INPUT" || !(inputElement2.classList.contains("qty-input"))) {
            throw new TypeError("Aww! The target input tag of product card is not a type of `input` or does not have className called `qty-input`");
          }
          quantitylength2++;
          inputElement2.value = quantitylength2;
          await this.#saveQtyToSessionStorage(product_id_for_qty, quantitylength2); // sending the product id and qty. count to this method to save it to session which will be used for Card Re-rendering
          break;

        default:
          throw new Error("Actually we failed to find exact attribute... Oops!");
          break;
      }
      console.log("indar ka block chala");
      if(this.identity_name === "TOP PRODUCT SECTION"){
        // RenderCards.renderProductCards(this.targettedDOMElement, this.arrayForCardRe_Rendering[0], this.page_type);
        RenderCards.renderProductCards(this.secondDomElement, this.arrayForCardRe_Rendering[1], this.page_type);
      }else if(this.identity_name === "DISCOUNTED PRODUCT SECTION"){
        // RenderCards.renderProductCards(this.targettedDOMElement, this.arrayForCardRe_Rendering[1], this.page_type);
        RenderCards.renderProductCards(this.secondDomElement, this.arrayForCardRe_Rendering[0], this.page_type);
      }
      return;
    }
    console.log("bahar ka chala")
    throw new TypeError("The clicked and passed element is not a DOM element: error occured at manageQty_n_wishlist() function");
  }

  // This method is used to save product quanity info. to session which will be used for Card Re-rendering
  #saveQtyToSessionStorage(productId, qty = 1){
    return new Promise((resolve, reject)=>{
          clearTimeout(this.timer); // clearing the previous timer of async.. function
          if(!productId){
            reject(new ReferenceError("'product id' is required as parameter!"));
          }
          if(!qty){
            reject(new ReferenceError("'quantity' is required as parameter!"));
          }
          this.timer = setTimeout(()=>{
            let isExists = false;
            console.warn(this.#productQtyArray[0])
          this.#productQtyArray.forEach((each_obj, index)=>{
            if(each_obj.product_id === productId){
              each_obj.qty = qty;
              // console.log("qty:",qty)
              // console.log(each_obj.qty);
              isExists = true;
            }
          });
          if (!isExists) this.#productQtyArray.push({product_id: productId, qty});
          
          console.log(this.#productQtyArray);
          sessionStorage.setItem("logoIpsum-product-quantity-data", JSON.stringify(this.#productQtyArray));
          resolve(true);
          },500)
    });
  }
}

export default eventController;