// class for all types of Rendering Cards

class RenderCards {

  static renderSkeletonCards(elementToRender, timesToRender = 1) {
    if (!elementToRender || typeof (elementToRender) !== "object") {
      throw new TypeError("Oops! We expected a parameter at renderCards function but didn't got it");
    } else if (elementToRender.nodeType !== 1 || !(elementToRender instanceof Element)) {
      throw new ReferenceError("We didn't get any DOM element as parameter in renderCards function!");
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

};

export default RenderCards;