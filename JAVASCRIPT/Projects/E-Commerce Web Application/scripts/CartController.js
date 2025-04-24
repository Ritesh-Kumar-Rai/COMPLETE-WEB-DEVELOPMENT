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

  add_product_to_CART(id, input_value){
    // const qtyData = JSON.parse(sessionStorage.getItem("logoIpsum-product-quantity-data")) || [{product_id: 5, qty: 45}];
    const qtyData = [{product_id: 5, qty: 44}]
    const productQty = Number(qtyData.find( each_obj => each_obj.product_id === id)?.qty) || null;

    if(!productQty){
      throw new CartError("We are unable to get the product Quantity!" + productQty);
    }
    console.log(`product id is ${id} which has quantity : ${productQty}`);
    if(!this.#CART.includes(id)){
      this.#CART.push(id);
    }
    qtyData.forEach((each_obj)=>{
      if(each_obj.product_id === id){
        each_obj.qty++;
      }
    })
    console.log(qtyData);
  }

  remove_product_from_CART(id){

  }

  isAvailableInCART(id){

  }
}

const obj = new CartController();

try {
  obj.add_product_to_CART(5,89);
  const arr = obj.getCARTData();
  console.log(arr);
  obj.add_product_to_CART(2,89);
  console.log(obj.getCARTData());
} catch (error) {
  console.error(error.name, error.message);
}