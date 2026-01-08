from flask import jsonify, Response, make_response
from werkzeug.security import generate_password_hash, check_password_hash
import datetime
import jwt
from mysql.connector import errors 
from db.connect_to_mysql import get_db_connection
import os


# function to generate the access and refresh token
def generate_access_n_refresh_token(user_id):
    # Generate JWT tokens 
    access_token = jwt.encode( {
            "id": user_id, 
            "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
            }, 
            os.getenv('ACCESS_TOKEN_SECRET_KEY'), algorithm="HS256" ) 
    
    refresh_token = jwt.encode( {
            "id": user_id, 
            "exp": datetime.datetime.utcnow() + datetime.timedelta(days=7)
            }, os.getenv('REFRESH_TOKEN_SECRET_KEY'), algorithm="HS256" )

    return access_token, refresh_token
                 



class UserModel:
    def __init__(self):
        pass
        # try:
            # Get the mysql pool connection
            # self.conn = get_db_connection()
            # self.cursor = self.conn.cursor()
            # print("📶 Successfully got Connection pool instance")
        # except Exception as err:
            # print("Oops! Something went wrong while fetching connection pool from UserModel class!")

    def registerUser(self, data):
        conn = get_db_connection()
        cursor = conn.cursor()
        if conn.is_connected():
            print("📶 Successfully got Connection pool instance")
        else:
            raise ConnectionError('😶Failed to connect to db for a current pool transaction!')

        try:
            required_fields = ("fullname", "email", "password")
            if not all(data.get(f) for f in required_fields):
                return jsonify({"error": "Missing required fields"}), 400

            
            cursor.execute("SELECT id, email FROM `users` WHERE email=%s", (data['email'],))
            if cursor.fetchone():
                return jsonify({"error": "Email already exists!"}),400
            
            hashed_password = generate_password_hash(data['password'])

            if not hashed_password:
                return jsonify({"error": "Password failed to encrypt!"}),500

            
            query = "INSERT INTO `users`(fullname, email, password) VALUES(%s, %s, %s)"
            values = (data['fullname'], data['email'], hashed_password)

            cursor.execute(query, values)
            conn.commit()

            if cursor.rowcount > 0:
                return jsonify({"success": True,"message": "User registered successfully", "last_id": cursor.lastrowid}), 201
            
            return jsonify({"message": "User already exists"}),400

        except errors.IntegrityError:
            return jsonify({"error": "Email already exists"}), 400
        except errors as mysqlerror:
            conn.rollback()
            return jsonify({"error": mysqlerror}),500
        except Exception as err:
            print("Error From RegisterUser model \n",err)
            conn.rollback()
            return jsonify({"error": "Internal Server Error!"}),500
        finally:
            if cursor : cursor.close()
            if conn : conn.close()
            print("Connection closed")

    def loginUser(self, email, password):
            conn = get_db_connection()
            cursor = conn.cursor(dictionary=True)
            try:
                if not email or not password:
                    return jsonify({"error": "`email` and `password` is required to login!"}),400
                
                cursor.execute("SELECT id, fullname, email, password FROM `users` WHERE email=%s", (email,))
                user = cursor.fetchone()

               
                try:
                    if not user:
                        return jsonify({"error": "user not exist!"}),404;     
            
                    if not check_password_hash(user['password'], password):
                        return jsonify({"error": "Invalid Credentials!"}),401;  
                except Exception as error:
                    print("Error caught inside loginUser try..catch ->", str(error))  
                    return jsonify({"error": str(error), "message": "Server error while checking password.."}),500
                  
                print(user)

                # get access and refresh token
                access_token, refresh_token = generate_access_n_refresh_token(user['id'])

                # Now, we required to update the user record in mysql to update the refresh token
                # like:
                '''
                query = "UPDATE `users` SET refresh_token=%s WHERE id=%s"
                values = (refresh_token, res[0]['id'])
                cursor.execute(query, values)
                conn.commit()
                cursor.rowcount > 0 : data updated successfully.
                then continue to next step!
                '''

                query = "UPDATE `users` SET refresh_token=%s WHERE id=%s;"
                values = (refresh_token, user['id'])
                cursor.execute(query, values)
                conn.commit()
                if cursor.rowcount <= 0:
                    return jsonify({"error": "Something went wrong while login user!"}),500
                
                print('-----------------------------------------------------------------------------')

                response = make_response(jsonify({
                    "success": True,
                    "message": "Login successful.",
                    "payload": {
                        "dataset": {
                            "fullname": user.get('fullname', None),
                            "email": user.get('email', None)
                        },
                        "accessToken": access_token,
                        "refreshToken": refresh_token,
                        "length": len(user)
                    }
                }), 200) 

                response.set_cookie(
                    'refresh_token', 
                    refresh_token, 
                    httponly=True,   # Prevents JavaScript from reading the cookie (XSS protection)
                    secure=True,     # Only sends over HTTPS
                    samesite='Lax',  # Prevents CSRF attacks
                    max_age=7 * 24 * 60 * 60 # 7 days in seconds
                )

                response.set_cookie(
                    'access_token',
                    access_token,
                    httponly=True,
                    secure=True,
                    samesite='Lax',
                    max_age=30 * 60 # 30min 
                ) 

                return response
            
            except errors as mysqlerror:
                conn.rollback()
                print('error from MYSQL 😶 ->', str(mysqlerror))
                return jsonify({"error": str(mysqlerror)}),500
            except Exception as err:
                print("Error From LoginUser model \n",str(err))
                conn.rollback()
                return jsonify({"error": str(err), "message": "Internal Server Error"}),500
            finally:
                if cursor : cursor.close()
                if conn : conn.close()

    def logoutUser(self, userid):
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        try:
            if not userid:
                return jsonify({"error": "user id is required!"}), 400
        
            # reset all cookies then reset refresh token from db
            query = "UPDATE `users` SET refresh_token=NULL WHERE id=%s"
            values = (userid,)
            cursor.execute(query,values)
            conn.commit()
            if cursor.rowcount > 0:
                response = make_response(jsonify({
                    "success": True,
                    "message": "user successfully loggedout."
                }), 200)

                response.delete_cookie('access_token')
                response.delete_cookie('refresh_token')

                return response
                
            
            return jsonify({"error": "user not found!"}), 404
        except Exception as error:
            print(f"Error while logging out user! -> {error}")
            conn.rollback()
            return jsonify({"error": "user is not authorized to logout!"}),401
        finally:
            if cursor: cursor.close()
            if conn: conn.close()

    def regenerate_access_token(self, incoming_refresh_token):
            try:
                conn = get_db_connection()
                cursor = conn.cursor(dictionary=True)

                decoded_token = jwt.decode(incoming_refresh_token, os.getenv('REFRESH_TOKEN_SECRET_KEY'), algorithms=["HS256"])

                user_id = decoded_token.get('id')

                if not user_id:
                    return jsonify({"error": "Whoops! we got the token but credentials was missing! It looks like the token was invalid."}),401
                
                print(f"1----------------------{user_id}--------------------------------------")
                
                cursor.execute("SELECT refresh_token FROM `users` WHERE id=%s", (user_id,))
                user = cursor.fetchone()

                print("yaha tak", user, type(user))
                print("icoming tak",incoming_refresh_token, type(incoming_refresh_token))

                if not user or user['refresh_token'] != incoming_refresh_token:
                    return jsonify({"error": "Invalid refresh token"}), 401
                
                print(f"2---------------------------------{user['refresh_token']}-------------------------------------")
                print(f"2---------------------------------{incoming_refresh_token}-------------------------------------")
                
                # now re-generate both access and refresh token
                access_token, refresh_token = generate_access_n_refresh_token(user_id)

                if not access_token or not refresh_token:
                    return jsonify({"error": "Oops! My bad the tokens are failed to re-generate.. try again later!"}),500
                
                cursor.execute("UPDATE `users` SET refresh_token=%s WHERE id=%s", (refresh_token, user_id))
                conn.commit()

                if cursor.rowcount <= 0:
                    raise SystemError("refresh token was failed to store to db!")
                
                response = make_response(jsonify({
                    "success": True,
                    "message": "the tokens is now re-generated",
                    "access_token": access_token,
                    "refresh_token": refresh_token
                }),200)

                response.set_cookie(
                    'refresh_token', 
                    refresh_token, 
                    httponly=True,   # Prevents JavaScript from reading the cookie (XSS protection)
                    secure=True,     # Only sends over HTTPS
                    samesite='Lax',  # Prevents CSRF attacks
                    max_age=7 * 24 * 60 * 60 # 7 days in seconds
                )

                response.set_cookie(
                    'access_token',
                    access_token,
                    httponly=True,
                    secure=True,
                    samesite='Lax',
                    max_age=30 * 60 # 30min 
                ) 

                return response


            except jwt.ExpiredSignatureError: 
                return jsonify({"error": "Refresh token expired"}), 401 
            except jwt.InvalidTokenError: 
                return jsonify({"error": "Invalid refresh token"}), 401
            except errors as mysqlerror:
                conn.rollback()
                return jsonify({"error": str(mysqlerror)}),500
            except Exception as error:
                print(f"Error while regenerating access token! -> {str(error)}")
                conn.rollback()
                return jsonify({"error": "something went wrong while regenerating access token!"}),500
            finally:
                if cursor: cursor.close()
                if conn: conn.close()