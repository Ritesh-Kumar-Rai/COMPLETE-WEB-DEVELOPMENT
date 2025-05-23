// classes for CART related operational methods and values

// custom error class
class CartError extends Error{
  constructor(message){
    super(message);
    this.name = "CartError";
  }
};

// TODO -> While saving data to Cookie, we need to store their quantity also and we required to fetch and display products based on that also when session started first time
// TODO -> I have implemented the save to cookie and get data from cookie methods, but i haven't saved data with quantity because this might reflect the whole data structure of CART array and causes eventController.js class to modify there code also, ... will do this later

// main class for CART Related Operations
class CartController{
  #CART = [];
  #cookieName = "logoIpsum-CART-Cookie";
  constructor(navbar_count_element){
    console.log("CART constructor called");
    console.log(this.#CART, typeof navbar_count_element);
    if(!(navbar_count_element instanceof Element) && navbar_count_element.nodeType !== 1){
      throw new CartError("the passed navbar cart button element to constructor is must be DOM element type!");
    }

    this._navbar_count_element = navbar_count_element;
    this.#CART = this.#getCookie(this.#cookieName) || []; // fetching initial data from cookie
    this.#displayTotalCARTCount();
  }

  getCARTData(){
    const temp_cart_arr = this.#CART;
    return temp_cart_arr;
  }

  isAvailableInCART(id){
    // method to check is id exists in CART array or not by returning true and false
    if(!id){
      throw new CartError("'id' parameter is required!");
    }
    if(typeof(id) !== 'number'){
      throw new CartError("'id' parameter must be Numeric type!");
    }

    return this.#CART.includes(id);
  }

  // this method is particularly useful for navbar cart button when developer wants to display total added products count 
  #displayTotalCARTCount(){
    const totalLength = this.#CART.length;
    this._navbar_count_element.textContent = totalLength;
  }

  add_product_to_CART(id, input_element){
    if(!id || typeof(id) !== 'number' || !Number.isInteger(id) || id <= 0){
      throw new CartError("id is required! and must be Numeric type and positive value");
    }

    if(!(input_element instanceof Element) && input_element.nodeType !== 1){
      throw new CartError("'input_element' is must be DOM element type");
    }
    const sessionName = "logoIpsum-product-quantity-data";
    let qtyData = [];
    try {
      qtyData = JSON.parse(sessionStorage.getItem(sessionName)) || [];
      if(!Array.isArray(qtyData)) throw new Error(); // Ensure it's an array
    } catch (error) {
      console.error(`Invalid session data for ${sessionName}. Resetting to empty array.`);
      qtyData = []; // Reset to a safe default
    }
    // const productQty = Number(qtyData.find( each_obj => each_obj.product_id === id)?.qty) || 1;
    // console.log(`product id is ${id} which has quantity : ${productQty}`);
    
    if(!this.#CART.includes(id)){
      this.#CART.push(id);
      this.#displayTotalCARTCount()
      this.#saveCARTData();
      return; // here because CART array does not contains particular id, we will inject it 
    }
    // but when the product id already exists in CART array we will increment the quantity of product from/to sessionStorage
    // here we will increment the quantity of specific product by 1
    // the qtyData is from sessionStorage, and the below code is used to increment the quantity of it by 1.
    const existing_product = qtyData.find(each_obj => each_obj.product_id === id);
    if(existing_product){
      existing_product.qty++;
      input_element.value = parseInt(input_element.value || 1) + 1; // changing the input value state
    }else{
      qtyData.push({product_id: id, qty : 2}); 
      input_element.value = parseInt(input_element.value || 1) + 1; 
    } 

    const updatedData = JSON.stringify(qtyData);
    if(sessionStorage.getItem(sessionName) !== updatedData){
      sessionStorage.setItem(sessionName, updatedData);
    }
  }

  remove_product_from_CART(id){
    // method to remove the product from CART
    if(!id){
      throw new CartError("'id' parameter is required!");
    }
    if(typeof(id) !== 'number'){
      throw new CartError("'id' parameter must be Numeric type!");
    }

    const index_to_remove = this.#CART.indexOf(id);
    if (index_to_remove === -1) {
      throw new CartError(`Product ID ${id} does not exist in the cart.`);
    }
    this.#CART.splice(index_to_remove, 1); // built-in method to remove the specific value from array [in this case the product id will be removed] 
    // [Note: The splice() method will modify the original array]
    this.#saveCARTData();
  }

  #saveCARTData() {
    // method to store/save CART data to Cookie/Session
    this.#setCookie(this.#cookieName, this.#CART, 5, "days");
    // alert(this.#getCookie(this.#cookieName));
  }

  // method to save CART data with options for minutes, hours, or days
  #setCookie(name, value, duration, unit) {
    const date = new Date();

    // Calculate expiration time based on the unit (minutes, hours, days)
    switch (unit) {
      case "minutes":
        date.setTime(date.getTime() + (duration * 60 * 1000)); // Convert minutes to milliseconds
        break;
      case "hours":
        date.setTime(date.getTime() + (duration * 60 * 60 * 1000)); // Convert hours to milliseconds
        break;
      case "days":
        date.setTime(date.getTime() + (duration * 24 * 60 * 60 * 1000)); // Convert days to milliseconds
        break;
      default:
        console.error("Invalid time unit! Use 'minutes', 'hours', or 'days'.");
        return;
    }

    // Create cookie with expiration date
    const expires = `expires=${date.toUTCString()}`;
    // document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(JSON.stringify(value))}; ${expires}; path=/`;
    document.cookie = `${encodeURIComponent(name)}=${JSON.stringify(value)}; ${expires}; path=/`;
    console.log(`Cookie "${name}" set with expiration: ${date}`);
  }

  // method to get data from a cookie
  #getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
      const [key, value] = cookie.split("=");
      if (decodeURIComponent(key) === name) {
        return JSON.parse(decodeURIComponent(value)); // Parse the JSON back into an array/object
      }
    }
    return null; // Return null if the cookie doesn't exist
  }

}


export default CartController;