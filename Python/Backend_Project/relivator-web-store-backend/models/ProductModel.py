import math
from flask import jsonify
from mysql.connector import errors 
from db.connect_to_mysql import get_db_connection

class ProductModel:
    def __init__(self):
        pass

    def fetch_products_with_pagination_n_filter(self, sql_query1, params1, sql_query2, params2, page, limit):
        try:
            conn = get_db_connection()
            cursor = conn.cursor(dictionary=True)

            cursor.execute(sql_query1, params1)
            products = cursor.fetchall() # executing the query to fetch all products with or without filters

            cursor.execute(sql_query2, params2)
            total_items = cursor.fetchone()['total_items'] # executing the query to fetch the total size of all available products
            
            '''
            if not products or not total_items:
                return jsonify({"success": False, "error": "Sorry we are failed to fetch products..right now!"}),500
            '''
            
            # Calculate total_pages formula: (total_items + limit - 1) / limit
            # total_pages = math.ceil((total_items + limit - 1) / 10) # this has a bug if total_item is 22 then the total_pages expected is 3 but here it returns 4
            total_pages = max(1, math.ceil(total_items / limit)) # worst case if total_products is 0 then total_page = 1

            has_products = len(products) > 0

            return jsonify({
                "success": True,
                "has_data": has_products,
                "current_page": page,
                "message": "No products matched your filters." if not has_products else "Successfully fetched products.",
                "limit": limit,
                "payload": {
                    "products": products
                },
                "total_items": total_items,
                "total_pages": total_pages
            }),200


        except errors as mysqlerror:
            return jsonify({"db_error": str(mysqlerror)}),500
        except Exception as err:
            print("Error From RegisterUser model \n",err)
            return jsonify({"error": "Internal Server Error!"}),500
        finally:
            if cursor : cursor.close()
            if conn : conn.close()

    def fetch_single_product(self, product_id):
        try:
            conn = get_db_connection()
            cursor = conn.cursor(dictionary=True)

            if not product_id:
                return jsonify({"error": "`id` required but didn't got it!"}),404 
            
            sql_query = "SELECT * FROM `products` WHERE is_active=1 AND id=%s;"
            values = (product_id,)

            cursor.execute(sql_query, values)
            result = cursor.fetchone()

            return jsonify({
                "success": True if result else False,
                "message": "product not found." if not result else "Successfully fetched product details.",
                "payload": {
                    "product": result
                }
            }),200

            
        except errors as mysqlerror:
            return jsonify({"db_error": str(mysqlerror)}),500
        except Exception as error:
            print(f"Error occurred while fetching single product: {error}")
            return jsonify({"error": f"Error occurred while fetching single product: {error}"}),500
        finally:
            if cursor : cursor.close()
            if conn : conn.close()

    def insert_single_product(self, sql_query, params):
        try:
            conn = get_db_connection()
            cursor = conn.cursor(dictionary=True) 

            if not sql_query or not params:
                jsonify({"success": False, "error": "Oops! we accepted your request but didn't got the required dataset! contact administrator or try again later!"}),400

            cursor.execute(sql_query, params)
            conn.commit()

            Success = True

            if cursor.rowcount <= 0:
                Success = False
                return jsonify({"success": False, "error": "We are regret but failed to add your product to catalog! try contacting system administrator"}),500
            
            new_id = cursor.lastrowid


            return jsonify({
                "success": Success,
                "message": "congrats 🎉 your product added successfully." if Success else "Pardon 😩 we are failed to add your product!",
                "payload": {
                    "new_product_added_id": new_id 
                }
            }),201 if Success else 202

            
        except errors as mysqlerror:
            conn.rollback()
            return jsonify({"db_error": str(mysqlerror)}),500
        except Exception as error:
            conn.rollback()
            print(f"Error occurred while inserting new product: {error}")
            return jsonify({"error": f"Error occurred while inserting your requested new product: {error}"}),500
        finally:
            if cursor : cursor.close()
            if conn : conn.close()


    def update_product(self, sql_query, params, product_id):
        try:
            conn = get_db_connection()
            cursor = conn.cursor(dictionary=True)

            cursor.execute(sql_query, tuple(params))
            conn.commit()

            if cursor.rowcount <= 0:
                conn.rollback()
                return jsonify({"success": False, "error": "We are regret but failed to update your product from catalog! try contacting system administrator"}),500
            
            return jsonify({
                "success": True,
                "message": "congrats 🎉 your product is updated successfully.",
                "payload": {
                    "updated_product_id": product_id 
                }
            }),200

        except errors as mysqlerror:
            conn.rollback()
            return jsonify({"db_error": str(mysqlerror)}),500
        except Exception as error:
            conn.rollback()
            print(f"Error occurred while updating existing product: {error}")
            return jsonify({"error": f"Error occurred while updating your existing product: {error}"}),500
        finally:
            if cursor: cursor.close()
            if conn: conn.close()

    
    def delete_product(self, product_id):
        try:
            conn = get_db_connection()
            cursor = conn.cursor(dictionary=True)

            cursor.execute("DELETE FROM `products` WHERE id=%s", (product_id,))
            conn.commit()

            if cursor.rowcount <= 0:
                conn.rollback()
                return jsonify({"success": False, "error": "Oops! Product was not found to delete, [recommended: instead to hard delete your product, my recommendation is just update your product active status to false, which hides your product from visibility to peoples.]"}),404
            
            return jsonify({
                "success": True,
                "message": "Oo 🤔 Your product is deleted permanently.",
                "payload": {
                    "deleted_product_id": product_id 
                }
            }),200

        except errors as mysqlerror:
            conn.rollback()
            return jsonify({"db_error": str(mysqlerror)}),500
        except Exception as error:
            conn.rollback()
            print(f"Error occurred while deleting existing product: {error}")
            return jsonify({"error": f"Error occurred while deleting your existing product: {error}"}),500
        finally:
            if cursor: cursor.close()
            if conn: conn.close()

    
    def toggle_product_hide_status(self, product_id, hide_status = 1):
        try:
            conn = get_db_connection()
            cursor = conn.cursor(dictionary=True)

            cursor.execute("UPDATE `products` SET is_active=%s WHERE id=%s", (hide_status, product_id))
            conn.commit()

            if cursor.rowcount <= 0:
                conn.rollback()
                return jsonify({"success": False, "error": "Oops! Product was not found to toggle hide status"}),404
            
            return jsonify({
                "success": True,
                "message": "🙏 Your product hide status was updated successfully.",
                "payload": {
                    "toggled_product_id": product_id 
                }
            }),200

        except errors as mysqlerror:
            conn.rollback()
            return jsonify({"db_error": str(mysqlerror)}),500
        except Exception as error:
            conn.rollback()
            print(f"Error occurred while toggling product hide status: {error}")
            return jsonify({"error": f"Error occurred while toggling your product hide status: {error}"}),500
        finally:
            if cursor: cursor.close()
            if conn: conn.close()


    # Category related models
    def fetch_categories(self):
        try:
            conn = get_db_connection()
            cursor = conn.cursor(dictionary=True)
            
            sql_query = "SELECT id, name, tags, slug FROM `categories`;"   

            cursor.execute(sql_query)
            categories = cursor.fetchall()

            return jsonify({
                "success": True if categories else False,
                "message": "categories not available." if not categories else "Successfully fetched list of categories.",
                "payload": {
                    "categories": categories
                }
            }),200

            
        except errors as mysqlerror:
            return jsonify({"db_error": str(mysqlerror)}),500
        except Exception as error:
            print(f"Error occurred while fetching categories: {error}")
            return jsonify({"error": f"Error occurred while fetching categories: {error}"}),500
        finally:
            if cursor : cursor.close()
            if conn : conn.close()

    

    def fetch_categories_count(self):
        try:
            conn = get_db_connection()
            cursor = conn.cursor(dictionary=True)
            
            sql_query = """SELECT 
            c.name as category_name, 
            COUNT(*) as total_count 
            FROM `products` p
            INNER JOIN `categories` c ON p.category = c.id
            WHERE c.name IN ('audio', 'gaming desks', 'gaming consoles', 'gaming laptops')
            GROUP BY c.name;"""   

            cursor.execute(sql_query)
            categories = cursor.fetchall()

            return jsonify({
                "success": True if categories else False,
                "message": "categories count not available." if not categories else "Successfully fetched no. of products available per category.",
                "payload": {
                    "categories_count_data": categories
                }
            }),200

            
        except errors as mysqlerror:
            return jsonify({"db_error": str(mysqlerror)}),500
        except Exception as error:
            print(f"Error occurred while fetching categories count: {error}")
            return jsonify({"error": f"Error occurred while fetching categories count: {error}"}),500
        finally:
            if cursor : cursor.close()
            if conn : conn.close()



        
    def insert_category(self, sql_query, params):
        try:
            conn = get_db_connection()
            cursor = conn.cursor(dictionary=True)
            print(sql_query, params)

            cursor.execute(sql_query, params)
            conn.commit()

            Success = True

            if cursor.rowcount <= 0:
                Success = False
                return jsonify({"success": False, "error": "We are regret but failed to add your new category record! try contacting system administrator"}),500
            
            new_id = cursor.lastrowid


            return jsonify({
                "success": True if Success else False,
                "message": "Congrats 🎉 your category added successfully." if Success else "Pardon 😩 we are failed to add your category!",
                "payload": {
                    "new_category_added_id": new_id
                }
            }),201 if Success else 202

            
        except errors as mysqlerror:
            conn.rollback()
            return jsonify({"db_error": str(mysqlerror)}),500
        except Exception as error:
            conn.rollback()
            print(f"Error occurred while inserting category: {error}")
            return jsonify({"error": f"Error occurred inserting your new requested category: {error}"}),500
        finally:
            if cursor : cursor.close()
            if conn : conn.close()