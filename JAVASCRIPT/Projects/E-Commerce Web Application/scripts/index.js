// import all necessary modules
import RenderCards from "./DOM scripts/RenderCards.js";
import eventController  from "./DOM scripts/eventController.js";

// Code for index.html and for further feature 

let indexPageFilteredArrayData = new Array(2); // this array will contains the 2 sections filtered sub array

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
    .then(response => {
      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }
      return response.json();
    })
    .then((response) => {
      const popularProducts = response.products.filter(product => product.popular);
      RenderCards.renderProductCards(topProductCardSection, Array.from(popularProducts));
      indexPageFilteredArrayData[0] = Array.from(popularProducts); // store it to global Array var which will use for Cards Re-rendering
        try {
          const event_controller1 = new eventController(topProductCardSection, "TOP PRODUCT SECTION", {secondDom: discountedProductCardSection, arrays: indexPageFilteredArrayData});
        } catch (error) {
          console.error(`${error.name} -> ${error.message}; [Error from: ${error.referenceFrom}]`);
        }
    })
    .catch((error) => {
      if(!navigator.onLine){
        console.error("Network Error:", error.message);
        console.error("It looks like you're offline. Please check your internet connection!");
      }else{  
        console.error("Something went wrong while fetching product data. Please try again later.");
        console.error(`${error.name} -> ${error.message}`);
      }

    });
    
    fetch("https://fakestoreapi.in/api/products?limit=20")
    .then(response => {
      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }
      return response.json();
    })
    .then(res => {
      let discountedProductsArray = [];  
      console.log("length",res.products.length);
      
      const sortedProducts = res.products.sort((a,b) => b.discount - a.discount);
      discountedProductsArray = sortedProducts.slice(0,5);
      RenderCards.renderProductCards(discountedProductCardSection, discountedProductsArray);
      indexPageFilteredArrayData[1] = Array.from(discountedProductsArray); // store it to global Array var which will use for Cards Re-rendering
        try {
          const event_controller2 = new eventController(discountedProductCardSection, "DISCOUNTED PRODUCT SECTION", {secondDom: topProductCardSection, arrays: indexPageFilteredArrayData});
        } catch (error) {
          console.error(`${error.name} -> ${error.message}; [Error from: ${error.referenceFrom}]`);
        }
    })
    .catch(error =>{
      if(!navigator.onLine){
        console.error("Network Error:", error.message);
        console.error("It looks like you're offline. Please check your internet connection!");
      }else{
        console.error("Something went wrong while fetching product data. Please try again later.");
        console.error(`${error.name} -> ${error.message}`);
      }

    })

// });

