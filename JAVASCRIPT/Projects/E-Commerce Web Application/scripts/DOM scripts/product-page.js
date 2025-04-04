// import class
import RenderCards from "../DOM scripts/RenderCards.js";

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

try {
  const similarProductContainer = document.querySelector(".similar-products-body");
  console.log(similarProductContainer)
  RenderCards.renderSkeletonCards(similarProductContainer, 5);
  fetchSingleProductData(productId);

} catch (error) {
  console.error(`${error.name} -> ${error.message}`);
}