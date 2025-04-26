// classes for CART related operational methods and values

// custom error class
class CartError extends Error{
  constructor(message){
    super(message);
    this.name = "CartError";
  }
};

// main class for CART Related Operations
class CartController{
  #CART = [];
  constructor(navbar_count_element){
    console.log(this.#CART, typeof navbar_count_element);
    if(!(navbar_count_element instanceof Element) && navbar_count_element.nodeType !== 1){
      throw new CartError("the passed navbar cart button element to constructor is must be DOM element type!");
    }

    this._navbar_count_element = navbar_count_element;
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
    if(!id || typeof(id) !== 'number'){
      throw new CartError("id is required! and must be Numeric type");
    }

    if(!(input_element instanceof Element) && input_element.nodeType !== 1){
      throw new CartError("'input_element' is must be DOM element type");
    }
    const sessionName = "logoIpsum-product-quantity-data";
    const qtyData = JSON.parse(sessionStorage.getItem(sessionName)) || [];
    const productQty = Number(qtyData.find( each_obj => each_obj.product_id === id)?.qty) || null;

    if(!productQty){
      // throw new CartError("We are unable to get the product Quantity!" + productQty);
    }
    console.log(`product id is ${id} which has quantity : ${productQty}`);
    if(!this.#CART.includes(id)){
      this.#CART.push(id);
      this.#displayTotalCARTCount()
      return; // here because CART array does not contains particular id, we will inject it 
    }
    // but when the product id already exists in CART array we will increment the quantity of product from/to sessionStorage
    // here we will increment the quantity of specific product by 1
    let isExists = false;
    qtyData.forEach((each_obj)=>{
      if(each_obj.product_id === id){
        each_obj.qty++;
        input_element.value++; // changing the input value state
        isExists = true;
      }
    });
    if (!isExists) qtyData.push({product_id: id, qty : 1}); // TODO
    sessionStorage.setItem(sessionName, JSON.stringify(qtyData));
    this.#displayTotalCARTCount();
    console.log("*****",qtyData);
    console.log(this.#CART)
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
  }

  

}


export default CartController;