// classes for wishlist related methods and values

// custom error class
class WishlistError extends Error {
  constructor(message) {
    super(message);
    this.name = "WishlistError";
  }
}

// wishlist main class
class WishlistController {
  #WISHLISTED_PRODUCTS = [];
  #cookieName = "logoIpsum-Wishlist-Cookie";
  constructor() {
    this.#WISHLISTED_PRODUCTS = this.#getCookie(this.#cookieName) || [];
    alert(this.#WISHLISTED_PRODUCTS);
    console.warn("constructor of WishlistController is executed...");
  }

  getWishlistData() {
    const stored_wishlist_data = this.#WISHLISTED_PRODUCTS;
    return stored_wishlist_data;
  }

  push_product_to_wishlist(id) {
    if (!id) {
      throw new WishlistError("'id' parameter is missing!");
    } else if (typeof (id) !== 'number') {
      throw new WishlistError("'id' parameter is expected as Numeric type!");;
    }
    // importing cookie data again to this wishlist array [because when more instances created it causes issue like both contains different data, so i am merging them]
    this.#WISHLISTED_PRODUCTS = this.#getCookie(this.#cookieName) || this.#WISHLISTED_PRODUCTS;

    if (this.isAvailableInWishlist(id)) {
      this.remove_product_from_wishlist(id);
      return false;
    }
    this.#WISHLISTED_PRODUCTS.push(id);
    console.log('product added to wishlist');
    console.log(this.#WISHLISTED_PRODUCTS);
    this.#saveWishlistData(); // invoking this method to save the wishlist data to cookie/session [after adding data to wishlist array...]
    return true;
  }

  remove_product_from_wishlist(id) {
    if (!id) {
      throw new WishlistError("'id' parameter is missing!");
    } else if (typeof (id) !== 'number') {
      throw new WishlistError("'id' parameter is expected as Numeric type!");;
    }
    // importing cookie data again to this wishlist array [because when more instances created it causes issue like both contains different data, so i am merging them]
    this.#WISHLISTED_PRODUCTS = this.#getCookie(this.#cookieName) || this.#WISHLISTED_PRODUCTS;
    console.log(`Attempting to remove ID: ${id} from wishlist.`);

    const index_to_remove = this.#WISHLISTED_PRODUCTS.indexOf(id);
    if(index_to_remove === -1){
      throw new WishlistError(`ID:${id} is not found in array!`);
    }
    this.#WISHLISTED_PRODUCTS.splice(index_to_remove, 1);
    if (this.isAvailableInWishlist(id)) {
      throw new WishlistError("We tried to remove product from wishlist but still it exists! How? try to find the reason. Strange");
    }
    console.warn("product is successfully removed from wishlist!");
    this.#saveWishlistData(); // invoking this method to save the wishlist data to cookie/session [after adding data to wishlist array...]
  }

  isAvailableInWishlist(id) {
    if (!id) {
      throw new WishlistError("'id' parameter is missing!");
    } else if (typeof (id) !== 'number') {
      throw new WishlistError("'id' parameter is expected as Numeric type!");;
    }

    return this.#WISHLISTED_PRODUCTS.includes(id);
  }

  #saveWishlistData() {
    // method to store/save wishlist data to Cookie/Session
    this.#setCookie(this.#cookieName, this.#WISHLISTED_PRODUCTS, 5, "minutes");
    alert(this.#getCookie(this.#cookieName));
  }

  // method to save cookies with options for minutes, hours, or days
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

  // method to delete a cookie
  #deleteCookie(name) {
    document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    console.log(`Cookie "${name}" has been deleted.`);
  }

}

export default WishlistController;


