// JS code for page navigation when user clicks on navbar cart btn

const navigateToCart = (page_type) => {
  if (!page_type) {
    throw new ReferenceError("We didn't get attribute from navbar go-to-cart-btn");
  }

  const baseUrl = window.location.origin + "/JAVASCRIPT/Projects/E-Commerce Web Application/";

  switch (page_type) {
    case "index.html":
      window.location.href = baseUrl + "./pages/cart.html";
      break;

    case "allProducts.html":
      window.location.href = baseUrl + "./pages/cart.html";
      break;

    case "product.html":
      window.location.href = baseUrl + "./pages/cart.html";
      break;

    case "wishlist.html":
      window.location.href = baseUrl + "./pages/cart.html";
      break;

    default:
      throw new TypeError("We failed to get current page name after clicked on Cart Btn. (error from navbar cart button)");

  }
}

// JS code for page navigation when user clicks on wishlist btn

const navigateToWishlist = (page_type) => {
  if (!page_type) {
    throw new ReferenceError("We didn't get attribute from navbar wishlist-btn");
  }

  const baseUrl = window.location.origin + "/JAVASCRIPT/Projects/E-Commerce Web Application/";

  switch (page_type) {
    case "index.html":
      window.location.href = baseUrl + "./pages/wishlist.html";
      break;

    case "allProducts.html":
      window.location.href = baseUrl + "./pages/wishlist.html";
      break;

    case "product.html":
      window.location.href = baseUrl + "./pages/wishlist.html";
      break;

    case "cart.html":
      window.location.href = baseUrl + "./pages/wishlist.html";
      break;

    default:
      throw new TypeError("We failed to get current page name after clicked on Wishlist Btn. (error from navbar cart button)");

  }
}

document.addEventListener("DOMContentLoaded", () => {

  try {
    // code for cart btn
    const navCartBtn = document.getElementById("navbar-go-to-cart-btn");

    navCartBtn.addEventListener('click', () => {
      const page_type = navCartBtn.getAttribute("data-page-type");
      console.log(page_type);
      try {
        navigateToCart(page_type);
      } catch (error) {
        console.error(`${error.name} -> ${error.message}`);
      }

    });

  } catch (error) {
    console.error(`${error.name} -> ${error.message}`);
  }

  try {
    // code for wishlist btn
    const navWishlistBtn = document.getElementById("navbar-wishlist-btn");

    navWishlistBtn.addEventListener('click', () => {
      const page_type = navWishlistBtn.getAttribute("data-page-type");
      navigateToWishlist(page_type);
    });
  } catch (error) {
    console.error(`${error.name} -> ${error.message}`);
  }

});