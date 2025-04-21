// class for all types of Rendering Cards

class RenderCards {

  static renderSkeletonCards(elementToRender, timesToRender = 1) {
    if (!elementToRender || typeof (elementToRender) !== "object") {
      throw new TypeError("Oops! We expected a parameter at renderSkeletonCards function but didn't got it");
    } else if (elementToRender.nodeType !== 1 || !(elementToRender instanceof Element)) {
      throw new ReferenceError("We didn't get any DOM element as parameter in renderSkeletonCards function!");
    }

    // creating a fragment to wrap and store all cards within it
    const fragment = document.createDocumentFragment();

    // loop to store multiple cards to fragment
    for (let i = 1; i <= timesToRender; i++) {
      // creating an card element
      const cardElem = document.createElement("div");
      cardElem.setAttribute("class", "skeleton-product-card-item");
      const card = `
            <div class="skeleton product-card-image-part">
            </div>
            <div class="skeleton ske-title"></div>
            <div class="skeleton ske-text"></div>
            <div class="skeleton ske-price"></div>
            <div class="product-card-footer-part">
                <div class="skeleton ske-text2">
                </div>
                <div class="skeleton ske-btn"></div>
            </div>`;
      cardElem.innerHTML = card;
      fragment.appendChild(cardElem);
    }
    elementToRender.replaceChildren(fragment);

  }

  static renderProductCards(elementToRender, arrayOfProducts, page_type = "home"){
    if (!elementToRender || typeof (elementToRender) !== "object") {
      throw new TypeError("Oops! We expected a parameter at renderProductCards function but didn't got it");
    } else if (elementToRender.nodeType !== 1 || !(elementToRender instanceof Element)) {
      throw new ReferenceError("We didn't get any DOM element as parameter in renderProductCards function!");
    }

    if (!arrayOfProducts) {
      throw new ReferenceError("Oops! We expecting an array of products");
    } else if (!Array.isArray(arrayOfProducts) && Object.prototype.toString.call(arrayOfProducts) !== '[object Array]') {
      throw new TypeError("We didn't get any Array Data Type!");
    }else if(arrayOfProducts.length < 1){
      throw new RangeError("Array must contains least amount of data!");
    }

    const page_goto_url = (page_type === "home") ? "./pages/product.html" : "./product.html";

    // logic for wishlist data checking
    const wishlistList = this.#checkForCookieWishlistData() || [];
    const qtyList = JSON.parse(sessionStorage.getItem("logoIpsum-product-quantity-data")) || [];

    // cards render logic
    const fragment = document.createDocumentFragment();

    arrayOfProducts.forEach((product)=>{
        const productCardElem = document.createElement("div");
        productCardElem.setAttribute("class", "product-card-item");
        productCardElem.setAttribute("data-product-id", product.id);


        const isExists = this.#isAvailableInWishlistCookie(wishlistList, product.id);
        const productQty = this.#isAvailableInSessionQty(qtyList, product.id) || 1;

        productCardElem.innerHTML = `<a href='${page_goto_url}?id=${product.id}' class="product-card-top-box">
                <span class="discount-badge">-${product.discount ?? 0}%</span>
                <button type="button" class="wishlist-button ${(isExists) ? 'isWishlisted' : ''}" data-type="wishlist-btn" title="${(isExists) ? 'remove from wishlist' : 'add to wishlist'}" onclick="HapticOn()"><i
                    class="ri-heart-3-${(isExists) ? "fill" : "line"}"></i></button>
                <figure>
                  <img
                    src="${product.image}"
                    alt="${product.image}" title="${product.brand} ${product.model} image">
                </figure>
              </a>
              <a href="${page_goto_url}?id=${product.id}" class="h3">${product.title}</a>
              <span class="rating"><i class="ri-star-fill"></i> 4.5</span>
              <span class="price">$${product.price}</span>
              <div class="product-card-bottom-box">
                <div class="product-qty">
                  <button type="button" class="quantity-left-minus" data-type="minus" onclick="HapticOn()"><i
                      class="ri-subtract-line"></i></button>
                  <input type="number" class="qty-input" value="${productQty}" min="1" spellcheck="false" readonly>
                  <button type="button" class="quantity-right-plus" data-type="plus" onclick="HapticOn()"><i class="ri-add-line"></i></button>
                </div>
                <button type="button" class="add-to-cart-btn" title="add to cart button" onclick="HapticOn()">Add to Cart</button>
              </div>`;

              fragment.appendChild(productCardElem);
    });

    elementToRender.replaceChildren(fragment);

  }

  // method to get wishlist data from a cookie
  static #checkForCookieWishlistData(){
    // cookie name
    const name = "logoIpsum-Wishlist-Cookie";
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
      const [key, value] = cookie.split("=");
      if (decodeURIComponent(key) === name) {
        return JSON.parse(decodeURIComponent(value)); // Parse the JSON back into an array/object
      }
    }
    return null; // Return null if the cookie doesn't exist
  }

  static #isAvailableInWishlistCookie(array, id){
    if (!array) {
      throw new ReferenceError("'array' parameter is missing!");
    } else if (!(array instanceof Array) && Object.prototype.toString.call(array) !== "[object Array]") {
      throw new TypeError("'array' parameter is expected as Array type!");;
    }

    if (!id) {
      throw new ReferenceError("'id' parameter is missing!");
    } else if (typeof (id) !== 'number') {
      throw new TypeError("'id' parameter is expected as Numeric type!");;
    }
    return array.includes(id);
  }


  static #isAvailableInSessionQty(array = [], id){
    if (!array) {
      throw new ReferenceError("'array' parameter is missing!");
    } else if (!(array instanceof Array) && Object.prototype.toString.call(array) !== "[object Array]") {
      throw new TypeError("'array' parameter is expected as Array type!");;
    }

    if (!id) {
      throw new ReferenceError("'id' parameter is missing!");
    } else if (typeof (id) !== 'number') {
      throw new TypeError("'id' parameter is expected as Numeric type!");;
    }
    
    const quantityObj = array.find(each => each.product_id === id);
    if(!quantityObj){
      console.error("No object found with product_id:", id);
      return null; // or any fallback value or logic as needed
    }
    return (quantityObj.qty > 1) ? quantityObj.qty : 1; 
  }
};

export default RenderCards;