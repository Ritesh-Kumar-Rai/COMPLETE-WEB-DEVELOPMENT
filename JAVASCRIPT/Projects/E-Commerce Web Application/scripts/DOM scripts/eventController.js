// Class for product Cards event controller like "DOM Manipulation"
import DOMError from "../Custom Errors/DOMError.js";
import WishlistController from "../WishlistController.js";

class eventController {

  #wishlistControllerObj;

  constructor(targettedDOMElement, name_for_identification) {
    this.targettedDOMElement = targettedDOMElement;
    this.identity_name = name_for_identification;
    this.quantitylength = 1;
    
    this.#wishlistControllerObj = new WishlistController(); // creating instance of WishlistController Object to class level variable

    if (!targettedDOMElement) {
      throw new DOMError("Target Element Parameter is expected", "eventController Class");
    } else if (!(targettedDOMElement instanceof Element) || targettedDOMElement.nodeType !== 1) {
      throw new DOMError("The parameter [which is targeted DOM] is must be an HTML DOM element", "eventController");
    }

    console.warn("eventController is Running\n", `Target Element is ${this.targettedDOMElement} for event listener\n`, "Identity Name: " + this.identity_name);

    this.#initEventListener();
  }

  #initEventListener() {
    console.log('initializing event listener...');

    this.targettedDOMElement.addEventListener("click", (e) => {
      e.preventDefault()
      // console.log(e.target, e);
      // we can use e.target.tagName or e.target.matches();
      const tagName = e.target.tagName;
      if (tagName === "I") {
        const parentElem = e.target.parentElement;
        try {
          this.#manageQty_n_wishlist(parentElem);
        } catch (error) {
          console.error(`${error.name} -> ${error.message}`);
          // console.error(error);
        }
      } else if (tagName === "BUTTON") {
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
  #manageQty_n_wishlist(passedElement){
    
    if (passedElement.nodeType === 1 && passedElement instanceof Element) {
      const attribute = passedElement.getAttribute("data-type");
      // checking for null or undefined value
      if (!attribute) {
        throw new ReferenceError("We are failed to get Attribute: data-type");
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
          console.log("arr->", this.#wishlistControllerObj.getWishlistData());
          break;

        case "minus":
          if (this.quantitylength === 1 || this.quantitylength < 2) {
            return;
          }

          const inputElement = passedElement.nextElementSibling;
          if (!inputElement || inputElement.nodeType !== 1 || !(inputElement instanceof Element)) {
            throw new ReferenceError("Oops! We failed to target nextElement Sibling: reference -> manageQty_n_wishlist() function");
          }

          if (inputElement.tagName !== "INPUT" || !(inputElement.classList.contains("qty-input"))) {
            throw new TypeError("Aww! The target input tag of product card is not a type of `input` or does not have className called `qty-input`");
          }
          this.quantitylength--;
          inputElement.value = parseInt(this.quantitylength);
          break;

        case "plus":
          const inputElement2 = passedElement.previousElementSibling;
          if (!inputElement2 || inputElement2.nodeType !== 1 || !(inputElement2 instanceof Element)) {
            console.warn(inputElement2)
            throw new ReferenceError("Oops! We failed to target prevElement Sibling: reference -> manageQty_n_wishlist() function");
          }

          if (inputElement2.tagName !== "INPUT" || !(inputElement2.classList.contains("qty-input"))) {
            throw new TypeError("Aww! The target input tag of product card is not a type of `input` or does not have className called `qty-input`");
          }
          this.quantitylength++;
          inputElement2.value = this.quantitylength;
          break;

        default:
          throw new Error("Actually we failed to find exact attribute... Oops!");
          break;
      }
      console.log("indar ka block chala");
      return;
    }
    console.log("bahar ka chala")
    throw new TypeError("The clicked and passed element is not a DOM element: error occured at manageQty_n_wishlist() function");
  }

}

export default eventController;