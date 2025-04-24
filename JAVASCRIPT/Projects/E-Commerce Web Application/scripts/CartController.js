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
  constructor(){
    console.log(this.#CART)
  }

  getCARTData(){
    const temp_cart_arr = this.#CART;
    return temp_cart_arr;
  }

  add_product_to_CART(id){

  }

  remove_product_from_CART(id){
    
  }

  isAvailableInCART(id){

  }
}

