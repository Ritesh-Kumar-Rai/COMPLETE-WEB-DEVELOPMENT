// JS code for page navigation when user clicks on navbar cart btn

const navigateToCart = (page_type) =>{
  if(!page_type){
    throw new ReferenceError("We didn't get attribute from navbar add-to-cart-btn");
  }

  const baseUrl = window.location.origin + "/JAVASCRIPT/Projects/E-Commerce Web Application/";

    switch(page_type){
      case "index.html":
        window.location.href = baseUrl +"./pages/cart.html";
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

document.addEventListener("DOMContentLoaded",()=>{
  const navAdd_to_CartBtn = document.getElementById("navbar-add-to-cart-btn");

  navAdd_to_CartBtn.addEventListener('click',()=>{
    const page_type = navAdd_to_CartBtn.getAttribute("data-page-type");
    console.log(page_type);
    try {
      navigateToCart(page_type);
    } catch (error) {
      console.error(`${error.name} -> ${error.message}`);
    }
    
  })
});