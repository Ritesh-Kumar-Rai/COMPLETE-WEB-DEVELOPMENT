// import class
import RenderCards from "../DOM scripts/RenderCards.js";
import WishlistController from "../WishlistController.js";

// Code for product.html

// Get the current URL
const url = window.location.href;

// Creating a URL object
const urlObj = new URL(url);

// Creating a URLSearchParams object from the URL's query string
const params = urlObj.searchParams;

// Getting the 'id' parameter value
const productId = parseInt(params.get('id'));

// Log or use the productId as needed
console.log(productId); // This will print the id

// checking for sessionStorage for product quantity
const sessionQtyArray = JSON.parse(sessionStorage.getItem("logoIpsum-product-quantity-data")) || [];

// 5. Block of Code
const isAvailableInSessionQty = (id) =>{
  if (!sessionQtyArray) {
    return 1;
  } else if (!(sessionQtyArray instanceof Array) && Object.prototype.toString.call(sessionQtyArray) !== "[object Array]") {
    return 1;
  }

  if (!id) {
    throw new ReferenceError("'id' parameter is missing!");
  } else if (typeof (id) !== 'number') {
    throw new TypeError("'id' parameter is expected as Numeric type!");;
  }
  
  const quantityObj = sessionQtyArray.find(each => each.product_id === id);
  if(!quantityObj){
    console.error("No object found with product_id:", id);
    return 1; // or any fallback value or logic as needed
  }
  return (quantityObj.qty > 1) ? quantityObj.qty : 1; 
}


// 6. method to get wishlist data from a cookie and check it's availability
const checkForCookieWishlistData = () =>{
  // cookie name
  const name = "logoIpsum-Wishlist-Cookie";
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (decodeURIComponent(key) === name) {
      return JSON.parse(decodeURIComponent(value)); // Parse the JSON back into an array/object
    }
  }
  return []; // Return empty array if the cookie doesn't exist
}

const isAvailableInWishlistCookie = (id) =>{
  if (!wishlistData) {
    console.error("'wishlist data' is missing!");
    return false;
  } else if (!(wishlistData instanceof Array) && Object.prototype.toString.call(wishlistData) !== "[object Array]") {
    console.error("'wishlist data' is expected as Array type!");
    return false;
  }

  if (!id) {
    throw new ReferenceError("'id' parameter is missing!");
  } else if (typeof (id) !== 'number') {
    throw new TypeError("'id' parameter is expected as Numeric type!");
  }
  return wishlistData.includes(id);
}

// checking for wishlist cookie
const wishlistData = checkForCookieWishlistData();


// 2. Block of Code
const fetchSingleProductData = (id) =>{
  if(!id || typeof(id) !== "number"){
    // console.warn(id, typeof id)
    throw new ReferenceError("id as parameter is required.");
  }

  fetch(`https://fakestoreapi.in/api/products/${id}`)
  .then(res => res.json())
  .then((response) =>{
    console.log(response.status);
    const [category_type, id] = printProductInfo(response.product);
    // --
    const quantityElement = document.getElementById("qty-input");
    if(!quantityElement && !(quantityElement instanceof Element)){
      throw new ReferenceError("failed to get quantity input element!");
    }
    quantityElement.value = isAvailableInSessionQty(id);

    const wishlistElement = document.querySelector(".wishlist-btn");
    if(!wishlistElement && !(wishlistElement instanceof Element)){
      throw new ReferenceError("failed to get wishlist btn element!");
    }
    const isWishlisted = isAvailableInWishlistCookie(id);
    isWishlisted ? wishlistElement.classList.add("isWishlisted") : wishlistElement.classList.remove("isWishlisted");
    isWishlisted ? wishlistElement.firstElementChild.setAttribute("class","ri-heart-3-fill") :  wishlistElement.firstElementChild.setAttribute("class", "ri-heart-3-line");
    // --
    fetchandRenderProduct_byCategory(category_type, id);
  })
  .catch(err => console.error(`${err.name} -> ${err.message}`));
}

const breadcrumProductName = document.getElementById("breadcrum-product-name");
const productTitle = document.getElementById("product-title");
const productImage = document.getElementById("product-image");
const productBrand = document.getElementById("product-brand");
const productModel = document.getElementById("product-modelname");
const productCategoryType = document.getElementById("product-category-type");
const productColorType = document.getElementById("product-color-type");
const productDiscountedPriceElem = document.querySelector(".discounted-price");
const productActualPriceElem = document.querySelector(".actual-price");
const productDiscountPercentElem = document.querySelector(".discount-percent");
const productDescriptionElem = document.getElementById("product-description");

// function to calculate dicounted price
const calculateDiscountedPrice = (amount, discount) =>{
  const discountAmount = (discount/100) * amount;
  const discountedPrice = amount - discountAmount;
  return discountedPrice;
}

// 3. Block of Code
const printProductInfo = (productObj) =>{
  if(!productObj){
    throw new ReferenceError("productObj as parameter is Required!");
  }else if(typeof(productObj) !== "object" || Object.prototype.toString.call(productObj) !== "[object Object]"){
    throw new TypeError("Parameter productObj is not an object type!");
  }else if(Object.keys(productObj).length < 4){
    throw new RangeError("The provided product info. object is not complete object!");
  }

  breadcrumProductName.textContent = productObj?.title || "Oops! We failed to get title";
  productTitle.textContent = productObj?.title || "Oops! We failed to get title";
  productImage.src = productObj.image;
  productImage.alt = productObj.title || "product image";
  productImage.title = productObj.title || "product title";
  productBrand.textContent = productObj.brand;
  productModel.textContent = productObj.model;
  productCategoryType.textContent = productObj.category;
  productColorType.textContent = productObj.color;
  productDescriptionElem.innerHTML = productObj.description.replace(/(\r\n|\n|\r)/g, '<br><br>');

  if(productObj.discount){
    productDiscountedPriceElem.textContent = "₹" + calculateDiscountedPrice(Number(productObj.price), Number(productObj.discount))
    productActualPriceElem.textContent = "₹"+ productObj.price;
    productDiscountPercentElem.textContent = `(-${productObj.discount}% off)`;
    
    return [productObj.category, productObj.id];
  }
  productDiscountedPriceElem.textContent = "₹" + productObj.price;
  productActualPriceElem.textContent = "";
  productDiscountPercentElem.textContent = "";

  return [productObj.category, productObj.id];
}

// 4. Block of Code
const fetchandRenderProduct_byCategory = async (category_name, product_id) =>{
  try {
    const response = await fetch(`https://fakestoreapi.in/api/products/category?type=${category_name}`);

    const refinedResponse = await response.json();
    const productsArray =  await refinedResponse.products.filter((each_product)=>{
      if(each_product.id !== product_id){
        return each_product;
      }
    }).slice(0,5);
    const similarProElem = document.querySelector(".similar-products-body");
    
    setTimeout(()=>{
      RenderCards.renderProductCards(similarProElem, productsArray, "product");
    },10000);

  } catch (error) {
    console.error(`${error.name} -> ${error.message}`);
  }
}

// 1. Main Block of Code
try {
  const similarProductContainer = document.querySelector(".similar-products-body");
  console.log(similarProductContainer)
  RenderCards.renderSkeletonCards(similarProductContainer, 5);
  fetchSingleProductData(productId);
  listenEventsOnElements();

} catch (error) {
  console.error(`${error.name} -> ${error.message}`);
}


// 7. Block of Code 
function listenEventsOnElements(){
  // this function will used to attach an event listeners to elements

  const wishlistElement = document.querySelector(".wishlist-btn");
  const qtyInputElement = document.querySelector(".qty-input");

  // quantity Increment/Decrement Button Elements
  const qtyIncre = document.getElementById("qty-increment");
  const qtyDecre = document.getElementById("qty-decrement");

  const wishlistObj = new WishlistController(); // instance of WishlistController

  qtyIncre.addEventListener('click', ()=>{
    const value = parseInt(qtyInputElement.value);
    if(!value){
      throw new Error("input element must be numeric type");
    }
    value++;
    qtyInputElement.value = value;
  });
  qtyDecre.addEventListener('click', ()=>{
    const value = parseInt(qtyInputElement.value);
    if(!value){
      throw new Error("input element must be numeric type");
    }
    value--;
    qtyInputElement.value = value;
  });

  // wishlist Element
  wishlistElement.addEventListener("click", (e)=>{
    if(wishlistElement.classList.contains("isWishlisted")){
      wishlistObj.remove_product_from_wishlist(productId);
      wishlistElement.classList.remove("isWishlisted");
      wishlistElement.firstElementChild.setAttribute("class", "ri-heart-3-line");
    }else{
      wishlistObj.push_product_to_wishlist(productId);
      wishlistElement.classList.add("isWishlisted");
      wishlistElement.firstElementChild.setAttribute("class", "ri-heart-3-fill");
    }
  });
}