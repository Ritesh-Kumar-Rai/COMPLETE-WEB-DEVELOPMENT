// classes for wishlist related methods and values

// custom error class
class WishlistError extends Error{
  constructor(message){
    super(message);
    this.name = "WishlistError";
  }
}

// wishlist main class
class WishlistController{
  #WISHLISTED_PRODUCTS = [];
  constructor(){
    console.warn("constructor of WishlistController is executed...");
  }

  getWishlistData(){
    const stored_wishlist_data = this.#WISHLISTED_PRODUCTS;
    return stored_wishlist_data;
  }

  push_product_to_wishlist(id){
    if(!id){
      throw new WishlistError("'id' parameter is missing!");
    }else if(typeof(id) !== 'number'){
      throw new WishlistError("'id' parameter is expected as Numeric type!");;
    }
    if(this.isAvailableInWishlist(id)){
      this.remove_product_from_wishlist(id);
      return false;
    }
    this.#WISHLISTED_PRODUCTS.push(id);
    console.log('product added to wishlist');
    console.log(this.#WISHLISTED_PRODUCTS)
    return true;
  }

  remove_product_from_wishlist(id){
    if(!id){
      throw new WishlistError("'id' parameter is missing!");
    }else if(typeof(id) !== 'number'){
      throw new WishlistError("'id' parameter is expected as Numeric type!");;
    }

    const index_to_remove = this.#WISHLISTED_PRODUCTS.indexOf(id);
    this.#WISHLISTED_PRODUCTS.splice(index_to_remove, 1);
    if(this.isAvailableInWishlist(id)){
      throw new WishlistError("We tried to remove product from wishlist but still it exists! How? try to find the reason. Strange");
    }
    console.warn("product is successfully removed from wishlist!");
  }

  isAvailableInWishlist(id){
    if(!id){
      throw new WishlistError("'id' parameter is missing!");
    }else if(typeof(id) !== 'number'){
      throw new WishlistError("'id' parameter is expected as Numeric type!");;
    }

    return this.#WISHLISTED_PRODUCTS.includes(id);
  }
}

export default WishlistController;


