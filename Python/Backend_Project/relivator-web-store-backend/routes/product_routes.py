from flask import Blueprint, request, jsonify
from models.ProductModel import ProductModel

product_route_bp = Blueprint("product_routes", __name__)

obj = ProductModel() # creating instance of ProductModel to use it's methods for db query

# GET /api/v1/get-products?page=2&limit=5&category=3&brand=Sony&min_price=1000&max_price=5000
@product_route_bp.route("/get-products", methods=['GET'])
def getProducts():
    # fetch products all by default and with paginated and filters if those has passed via query url params
    try:
        limit = int(request.args.get("limit", 10))
        page = int(request.args.get("page", 1))
        category = request.args.get("category", 'all')
        brand = request.args.get("brand")
        min_price = request.args.get("min_price")
        max_price = request.args.get("max_price")

        # calculate offset value means how much to skip to get the next values/rows
        offset = (page * limit) - limit # (current_page * limit) - limit


        # 1st query to get all products
        sql_query = "SELECT * FROM `products` WHERE is_active = 1"
        params = []

        if category:
            if category != 'all':
                sql_query += " AND category = %s"
                params.append(category)
        if brand:
            sql_query += " AND brand = %s"
            params.append(brand)
        if min_price:
            sql_query += " AND base_price >= %s"
            params.append(min_price)
        if max_price:
            sql_query += " AND base_price <= %s"
            params.append(max_price)
        
        # Pagination 
        sql_query += " LIMIT %s OFFSET %s;"
        params.extend([limit, offset])

    
        # 2nd query to get total items
        sql_query2 = "SELECT COUNT(*) as total_items FROM `products` WHERE is_active=1"
        params2 = []

        if category:
            if category != 'all':
                sql_query2 += " AND category = %s"
                params2.append(category)
        if brand:
            sql_query2 += " AND brand = %s"
            params2.append(brand)
        if min_price:
            sql_query2 += " AND base_price >= %s"
            params2.append(min_price)
        if max_price:
            sql_query2 += " AND base_price <= %s"
            params2.append(max_price)

        
        return obj.fetch_products_with_pagination_n_filter(sql_query, params, sql_query2, params2, page, limit)

        # total_pages = math.ceil((100 - 1) / 10) # formula: (total_items + limit - 1) / limit
    
    except ValueError:
        print("Value must be passed at int")
        return jsonify({"status": "failed", "success": False, "error": "passed values must be `integer` type!"}),400
    except Exception as error:
        print("💣 Oops error caught during getting value for pagination of products", str(error))
        return jsonify({"status": "failed", "success": False, "error": str(error)}),400
    
  


    


@product_route_bp.route("/get-products/<int:id>", methods=['GET'])
def getSingleProduct(id):
    try:
        if not id:
            return jsonify({"success": False, "message": "`id` is missing!"}),404
        
        return obj.fetch_single_product(id)
    except Exception as error:
        print('Error while getting single product')
        return jsonify({"status": "failed", "success": False, "error": f'Error while getting single product: {error}'}),500


@product_route_bp.route("/add-product", methods=['POST'])
def addProduct():
    try:
        body = request.get_json()

        sql_query = """
            INSERT INTO `products` (product_name, description, features, specifications, brand, model_year, base_price, discount_percent, stock_quantity, rating, rating_count, category, image_url, is_active) 
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);        
        """

        params = (
            body.get("product_name"),
            body.get("description"),
            body.get("features"),
            body.get("specifications"),
            body.get("brand_name"),
            body.get("model_year"),
            body.get("base_price"),
            body.get("discount_percent", 0.00),
            body.get("stock_quantity", 1),
            body.get("rating", 0.00),
            body.get("rating_count", 0),
            body.get("category"),
            body.get("image_url"),
            body.get("is_active", True)
        )

        
        return obj.insert_single_product(sql_query, params)
    except Exception as error:
        print('Error while adding a single product')
        return jsonify({"status": "failed", "success": False, "error": f'Error while adding a new product : {error}'}),400

@product_route_bp.route("/update-product/<int:product_id>", methods=["PATCH"])
def updateProduct(product_id):
    try:
        body = request.get_json()

        if not product_id:
            return jsonify({"success": False, "message": f"`product id` is missing!"}),400

        # Allowed fields to update
        allowed_fields = [
            "product_name", "description", "features", "specifications", "brand",
            "model_year", "base_price", "discount_percent", "stock_quantity",
            "rating", "rating_count", "category", "image_url", "is_active"
        ]

        # Build dynamic SET clause
        set_clauses = []
        params = []

        for field in allowed_fields:
            if field in body:
                set_clauses.append(f"{field} = %s")
                params.append(body[field])

        if not set_clauses:
            return jsonify({"status": "failed", "success": False, "error": "No valid fields provided"}), 400
        
        sql_query = f""" UPDATE `products`
            SET {", ".join(set_clauses)}
            WHERE id = %s;    
        """
        params.append(product_id)


        return obj.update_product(sql_query, params, product_id)
    except Exception as error:
        print("Error while updating product:", error)
        return jsonify({"status": "failed", "success": False, "error": f"Error while updating product: {error}"}), 400


@product_route_bp.route("/delete-product/<int:id>", methods=['DELETE'])
def deleteProduct(id):
    try:
        if not id:
            return jsonify({"success": False, "message": f"`product id` is missing!"}),400
        
        return obj.delete_product(id)

    except Exception as error:
        print("Error while deleting product:", error)
        return jsonify({"status": "failed", "success": False, "error": f"Error while deleting product: {error}"}), 400
    

@product_route_bp.route("/toggle-hide-product/<int:id>", methods=['DELETE'])
def toggleProductHideStatus(id):
    try:
        if not id:
            return jsonify({"success": False, "message": f"`product id` is missing!"}),400
        
        body = request.get_json()

        isToHide = body.get("hide_status", 1)
        
        return obj.toggle_product_hide_status(id, isToHide)

    except Exception as error:
        print("Error while deleting product:", error)
        return jsonify({"status": "failed", "success": False, "error": f"Error while deleting product: {error}"}), 400
    


@product_route_bp.route("/categories", methods=['GET'])
def getCategories():
    try:
       return obj.fetch_categories()
        
    except Exception as error:
        print(f'Error while getting category list: {error}')
        return jsonify({"status": "failed", "success": False, "error": f'Error while getting category list : {error}'}),500
    
@product_route_bp.route("/add-category", methods=['POST'])
def addCategory():
    try:
       category_name = request.form.get("cat_name")
       category_tags = request.form.get("cat_tags")
       category_slug = request.form.get("cat_slug")

       if not category_name:
           return jsonify({"success": False, "error": "`category name` is required!"}),400
       
       sql_query = "INSERT INTO `categories`(name, tags, slug) VALUES (%s, %s, %s);"
       params = (category_name, category_tags, category_slug)

       return obj.insert_category(sql_query, params)
        
    except Exception as error:
        print(f'Error while adding new category: {error}')
        return jsonify({"status": "failed", "success": False, "error": f'Error while adding a new category: {error}'}),500