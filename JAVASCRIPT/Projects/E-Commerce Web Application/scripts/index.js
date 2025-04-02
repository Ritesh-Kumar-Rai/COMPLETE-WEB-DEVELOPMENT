// import all necessary modules
import RenderCards from "./DOM scripts/RenderCards.js";

// Code for index.html and for further feature 

function renderCards2(elementToRender) {

  elementToRender.innerHTML = "";

  let card =`
  <!-- product card item -->
      <div class="product-card-item">
        <a href="product.html?id=" class="product-card-top-box">
          <span class="discount-badge">-15%</span>
          <button type="button" class="wishlist-button" data-type="wishlist-btn" title="add to wishlist" onclick="HapticOn()"><i
              class="ri-heart-3-line"></i></button>
          <figure>
            <img
              src="https://images.unsplash.com/photo-1737268466076-f2aaf343061c?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="product title" title="Product Title">
          </figure>
        </a>
        <a href="#" class="h3">XBOX one x controller</a>
        <span class="rating"><i class="ri-star-fill"></i> 4.5</span>
        <span class="price">$18.76</span>
        <div class="product-card-bottom-box">
          <div class="product-qty">
            <button type="button" class="quantity-left-minus" data-type="minus" onclick="HapticOn()"><i
                class="ri-subtract-line"></i></button>
            <input type="number" class="qty-input" value="1" min="1" spellcheck="false">
            <button type="button" class="quantity-right-plus" data-type="plus" onclick="HapticOn()"><i class="ri-add-line"></i></button>
          </div>
          <button type="button" class="add-to-cart-btn" title="add to cart button" onclick="HapticOn()">Add to Cart</button>
        </div>
      </div> <!-- product card ends here-->
  `;

  for (let i = 1; i <= 5; i++) {
    elementToRender.innerHTML += card;
  }

}

// function to render actual product
const renderActualProductCards = (elementToRender, arrayOfProducts) => {
  if (!elementToRender || typeof (elementToRender) !== "object") {
    throw new TypeError("Oops! We expected a parameter at renderCards function but didn't got it");
  } else if (elementToRender.nodeType !== 1 || !(elementToRender instanceof Element)) {
    throw new ReferenceError("We didn't get any DOM element as parameter in renderCards function!");
  }



}


// document.addEventListener("DOMContentLoaded", () => {
  const topProductCardSection = document.getElementById("top-section-product-body");
  const discountedProductCardSection = document.getElementById("discounted-product-body");
  // code to display products on home page

  // renderCards(topProductCardSection, true);
  // renderCards(discountedProductCardSection, true);

  try {
    // executing a static method of RenderCards class
    RenderCards.renderSkeletonCards(topProductCardSection, 5);
    RenderCards.renderSkeletonCards(discountedProductCardSection, 5);
  } catch (error) {
    console.error(`${error.name} -> ${error.message}`);
  }

  fetch("https://fakestoreapi.in/api/products?limit=13")
    .then(response => response.json())
    .then((response) => {
      const popularProducts = response.products.filter(product => product.popular);

    })
    .catch((error) => {
      console.error(`${error.name} -> ${error.message}`);
    });

// });

