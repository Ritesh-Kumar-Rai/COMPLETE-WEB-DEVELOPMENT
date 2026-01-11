from flask import jsonify
from mysql.connector import errors 
from db.connect_to_mysql import get_db_connection


class WishlistModel:
    def __init__(self):
        pass

    def toggle_wishlist_add_remove(self, user_id, product_id):
        try:
            conn = get_db_connection()
            cursor = conn.cursor(dictionary=True)

            # check for existence of product in a wishlist
            cursor.execute("SELECT 1 FROM `wishlists` WHERE user_id = %s AND product_id = %s;", (user_id, product_id))
            isExist = cursor.fetchone()

            if isExist:
                # then delete the product from wishlist
                cursor.execute("DELETE FROM `wishlists` WHERE user_id = %s AND product_id = %s;", (user_id, product_id))
                conn.commit()
                action = "removed"
            else:
                # if not exist then insert it
                cursor.execute("INSERT INTO `wishlists`(user_id, product_id) VALUES(%s, %s);", (user_id, product_id))
                conn.commit()
                action = "added"

            return jsonify({
                "success": True,
                "message": "product added to wishlist." if action == 'added' else "product removed from wishlist",
                "payload": {
                    "added_product_id": product_id,
                    "user_id": user_id,
                    "action": action
                }
            }),201 if action == 'added' else 200

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

    def fetch_wishlist_products(self, user_id, product_id):
        try:
            conn = get_db_connection()
            cursor = conn.cursor(dictionary=True)

            sql_query = """
                SELECT
                    w.id AS wishlist_id,
                    w.user_id,
                    w.product_id,
                    w.added_at,
                    p.product_name,
                    p.base_price AS price,
                    p.image_url
                FROM wishlists AS w
                JOIN products AS p
                ON w.product_id = p.id
                WHERE user_id = %s;
            """

            cursor.execute(sql_query, (user_id,))
            all_records = cursor.fetchall()

            return jsonify({
                "success": True,
                "message": "You haven't added any product to wishlist yet!" if not all_records else "We successfully fetched your products from wishlist.",
                "payload": {
                    "all_products": all_records,
                    "length": len(all_records)
                }
            }),200
        
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