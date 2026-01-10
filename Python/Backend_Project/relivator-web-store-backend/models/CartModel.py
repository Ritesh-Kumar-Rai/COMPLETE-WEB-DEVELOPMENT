from flask import jsonify
from mysql.connector import errors 
from db.connect_to_mysql import get_db_connection


class CartModel:
    def __init__(self):
        pass

    def add_item_to_cart(self, user_id, product_id, requested_quantity):
        try:
            conn = get_db_connection()
            cursor = conn.cursor(dictionary=True) 

            # check for total stock quantity of a product before inserting a product with given qty.
            cursor.execute("SELECT stock_quantity FROM `products` WHERE id = %s;", (product_id,))
            
            total_stock = cursor.fetchone()['stock_quantity']

            # check is the product already exists in cart or not, if yes then what's the quantity
            # cursor.execute("SELECT quantity FROM `cart` WHERE user_id = %s AND product_id = %s;", (user_id, product_id))
            # row = cursor.fetchone()
            # existing_quantity = row['quantity'] if row else 0

            '''if existing_quantity + requested_quantity > total_stock:
                return jsonify({"success": False, "error": "Not enough stock available!"}),400
            '''
            if requested_quantity >= total_stock:
                    return jsonify({"success": False, "error": "Not enough stock available!"}),400


            sql_query = """INSERT INTO `cart` (user_id, product_id, quantity) 
            VALUES(%s, %s, %s)
            ON DUPLICATE KEY UPATE quantity = VALUES(quantity);
            """
            params = (user_id, product_id, requested_quantity)

            cursor.execute(sql_query, params)
            conn.commit()

            if cursor.rowcount <= 0:
                conn.rollback()
                return jsonify({"success": False, "error": "Somehow the request was accepted but failed to add to cart!" }),500


            return jsonify({
                "success": True,
                "message": "congrats 🎉 your product added to CART successfully.",
                "payload": {
                    "added_product_id": product_id,
                    "user_id": user_id,
                    "added_quantity": requested_quantity
                }
            }),201

            
        except errors as mysqlerror:
            conn.rollback()
            return jsonify({"db_error": str(mysqlerror)}),500
        except Exception as error:
            conn.rollback()
            print(f"Error occurred while adding product to cart: {error}")
            return jsonify({"error": f"Error occurred while adding your requested product to cart: {error}"}),500
        finally:
            if cursor : cursor.close()
            if conn : conn.close()


    def update_item_from_cart(self, user_id, product_id, updated_quantity):
        try:
            conn = get_db_connection()
            cursor = conn.cursor(dictionary=True)

            cursor.execute("SELECT stock_quantity FROM `products` WHERE id=%s;", (product_id,))
            product = cursor.fetchone()

            if not product:
                return jsonify({"success": False, "error": "product was not found! it might possible the product was delisted by owner"}),400
            
            total_stock = product['stock_quantity']

            if updated_quantity >= total_stock:
                return jsonify({"success": False, "error": "Not enough stock available!"}),400
            
            sql_query = "UPDATE `cart` SET quantity = %s WHERE user_id = %s AND product_id = %s;"
            params = (updated_quantity, user_id, product_id)

            cursor.execute(sql_query, params)
            conn.commit()

            if cursor.rowcount <= 0:
                conn.rollback()
                return jsonify({"success": False, "error": f"somehow but your product with id: {product_id} with requested quantity: {updated_quantity} isn't updated! try again later"}),500

            return jsonify({
                "success": True,
                "message": "product quantity has been updated successfully in cart.",
                "payload": {
                    "product_id": product_id,
                    "user_id": user_id,
                    "updated_quantity": updated_quantity
                }
            }),200


        except errors as mysqlerror:
            conn.rollback()
            return jsonify({"db_error": str(mysqlerror)}),500
        except Exception as error:
            conn.rollback()
            print(f"Error occurred while updating product inside cart: {error}")
            return jsonify({"error": f"Error occurred while updating your requested product in cart: {error}"}),500
        finally:
            if cursor : cursor.close()
            if conn : conn.close()

    def delete_form_cart(self, user_id, product_id):
        try:
            conn = get_db_connection()
            cursor = conn.cursor(dictionary=True)

            cursor.execute("DELETE FROM `cart` WHERE user_id = %s AND product_id = %s", (user_id, product_id))

            conn.commit()

            if cursor.rowcount <= 0:
                return jsonify({"success": False, "error": f"we are regret but failed to delete your product from cart, try again"}),500

            return jsonify({
                "success": True,
                "message": "product has been deleted successfully from cart.",
                "payload": {
                    "deleted_product_id": product_id,
                    "user_id": user_id,
                    "cart_id": cursor.lastrowid
                }
            }),200


        except errors as mysqlerror:
            conn.rollback()
            return jsonify({"db_error": str(mysqlerror)}),500
        except Exception as error:
            conn.rollback()
            print(f"Error occurred while deleting product from cart: {error}")
            return jsonify({"error": f"Error occurred while deleting your requested product from cart: {error}"}),500
        finally:
            if cursor : cursor.close()
            if conn : conn.close()

    def fetch_products_from_cart(self, user_id):
        try:

            conn = get_db_connection()
            cursor = conn.cursor(dictionary=True)

            if not user_id:
                return jsonify({"success": False, "error": "the user `id` is not passed in order to fetch products from cart"}),500
            

            # fetching all products from cart along with products table using inner-join

            sql_query = """
                SELECT 
                    c.id AS cart_id,
                    c.product_id,
                    c.quantity,
                    c.added_at,
                    p.product_name,
                    p.base_price AS price,
                    p.discount_percent,
                    p.image_url,
                    ROUND(p.base_price - (p.base_price * p.discount_percent / 100), 2) AS discounted_price,
                    ROUND((p.base_price - (p.base_price * p.discount_percent / 100)) * c.quantity, 2) AS total_price
                FROM `cart` as c
                JOIN `products` as p
                ON c.product_id = p.id
                WHERE user_id = %s;  
            """

            cursor.execute(sql_query, (user_id,))
            all_records = cursor.fetchall()


            return jsonify({
                "success": True,
                "message": "You haven't added any product to cart yet!" if not all_records else "We successfully fetched your products from cart.",
                "payload": {
                    "all_products": all_records,
                    "length": len(all_records)
                }
            }),200
        
        except errors as mysqlerror:
            return jsonify({"db_error": str(mysqlerror)}),500
        except Exception as error:
            print(f"Error occurred while fetching products from cart: {error}")
            return jsonify({"error": f"Error occurred while fetching all your added product from cart: {error}"}),500
        finally:
            if cursor : cursor.close()
            if conn : conn.close()