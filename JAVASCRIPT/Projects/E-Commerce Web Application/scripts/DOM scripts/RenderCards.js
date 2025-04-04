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
      console.log(i);
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

    const fragment = document.createDocumentFragment();

    arrayOfProducts.forEach((product)=>{
        const productCardElem = document.createElement("div");
        productCardElem.setAttribute("class", "product-card-item");

        productCardElem.innerHTML = `<a href='${page_goto_url}?id=${product.id}' class="product-card-top-box">
                <span class="discount-badge">-${product.discount ?? 0}%</span>
                <button type="button" class="wishlist-button" data-type="wishlist-btn" title="add to wishlist" onclick="HapticOn()"><i
                    class="ri-heart-3-line"></i></button>
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
                  <input type="number" class="qty-input" value="1" min="1" spellcheck="false">
                  <button type="button" class="quantity-right-plus" data-type="plus" onclick="HapticOn()"><i class="ri-add-line"></i></button>
                </div>
                <button type="button" class="add-to-cart-btn" title="add to cart button" onclick="HapticOn()">Add to Cart</button>
              </div>`;

              fragment.appendChild(productCardElem);
    });

    elementToRender.replaceChildren(fragment);

  }

};

export default RenderCards;