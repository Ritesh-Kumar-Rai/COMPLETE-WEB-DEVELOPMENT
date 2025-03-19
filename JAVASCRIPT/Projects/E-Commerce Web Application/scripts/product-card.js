
let quantitylength = 1; // you can replace this variable from manual quantity to get quantity from input tag inside manageQty_n_wishlist() function;

// script for product quantity control
const productCard = document.querySelector(".product-card-item");

// function to increment/decrement quantity or add to wishlist functionality
const manageQty_n_wishlist = (passedElement) => {
  if (passedElement.nodeType === 1 && passedElement instanceof Element) {
    const attribute = passedElement.getAttribute("data-type");
    // checking for null or undefined value
    if (!attribute) {
      throw new ReferenceError("We are failed to get Attribute: data-type");
    }
    switch (attribute) {
      case "wishlist-btn":
        if (passedElement.classList.contains("isWishlisted")) {
          passedElement.classList.remove("isWishlisted");
          passedElement.innerHTML = `<i class="ri-heart-3-line"></i>`;
        } else {
          passedElement.classList.add("isWishlisted");
          passedElement.innerHTML = `<i class="ri-heart-3-fill"></i>`;
        }
        break;

      case "minus":
        if (quantitylength === 1 || quantitylength < 2) {
          return;
        }

        const inputElement = passedElement.nextElementSibling;
        if (!inputElement || inputElement.nodeType !== 1 || !(inputElement instanceof Element)) {
          throw new ReferenceError("Oops! We failed to target nextElement Sibling: reference -> manageQty_n_wishlist() function");
        }

        if (inputElement.tagName !== "INPUT" || !(inputElement.classList.contains("qty-input"))) {
          throw new TypeError("Aww! The target input tag of product card is not a type of `input` or does not have className called `qty-input`");
        }
        quantitylength--;
        inputElement.value = parseInt(quantitylength);
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
        quantitylength++;
        inputElement2.value = quantitylength;
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

// manage card clicking function
const handleCardClick = (e) => {
  // console.log(e);
  const tagName = e.target.tagName;
  if (tagName === "I") {
    const parentElem = e.target.parentElement;
    try {
      manageQty_n_wishlist(parentElem);
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
      manageQty_n_wishlist(e.target);
    } catch (error) {
      console.error(`${error.name} -> ${error.message}`);
    }
  }
}

productCard.addEventListener('click', handleCardClick);
