import mysql.connector
from flask import jsonify, Response


'''
# DATABASE and SCHEMA's

CREATE DATABASE IF NOT EXISTS db_for_flask;

USE db_for_flask;

CREATE TABLE IF NOT EXISTS users(
	id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    ph_no VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SHOW TABLES;

'''

class UserModel:
    def __init__(self):
        try:
            self.conn = mysql.connector.connect(host='localhost', user='root', password='19BCA145', database='db_for_flask');
            self.cursor = self.conn.cursor(dictionary=True);
            print("Connection to MySQL is successfull.")
        except Exception as error:
            print('Something went wrong..\n',error)

    def getAllUsers(self):
        self.cursor.execute("SELECT * FROM `users`;")
        result = self.cursor.fetchall()
        if len(result) > 0:
            print("Records fetched successfully...getAllUsers()")
            return jsonify({
                "success": True,
                "datasets": result,
                "size": len(result)
            })
        return jsonify({
            "success": False,
            "message": "No records available!",
            "dataset": None
        })
    
    def createUser(self, data):
        try:
            query = "INSERT INTO `users`(name, email, password, ph_no) VALUES(%s,%s,%s,%s)";
            values = (data['username'], data['email'], data['password'], data['ph_no'])
            self.cursor.execute(query, values)

            self.conn.commit();

            print("created new user with id:",self.cursor.lastrowid)

            if self.cursor.rowcount > 0:
                return jsonify({
                    "success": True,
                    "message": "new user created.",
                    "last_id": self.cursor.lastrowid
                }),201;
        
            return jsonify({
                "success": False,
                "message": "User not created!",
                "error": "user not found or no changes made."
            }),404;
    
        except mysql.connector.Error as err:
            # If something goes wrong, undo any partial changes
            self.conn.rollback() 
            return jsonify({
                "success": False,
                "message": "Database error",
                "error": str(err)
            }), 500

        except Exception as err:
            print('Something went wrong while inserting data into database!\n',err);
            return jsonify({
                "success": False,
                "message": 'Error while creating user!',
                "error": str(err)
            }), 500;

    def updateUser(self, user_id, data):
        try:
            query = "UPDATE `users` SET name=%s, ph_no=%s WHERE id=%s";
            values = (data['username'], data['ph_no'], user_id)
            self.cursor.execute(query, values)

            self.conn.commit();


            if self.cursor.rowcount > 0:
                return jsonify({
                    "success": True,
                    "message": f"user profile updated successfully for id[{user_id}].",
                    "affected_rows": self.cursor.rowcount
                }),200;
        
            return jsonify({
                "success": False,
                "message": "user not found or no changes made."
            }),404;
    
        except mysql.connector.Error as err:
            # If something goes wrong, undo any partial changes
            self.conn.rollback() 
            return jsonify({
                "success": False,
                "message": "Database error",
                "error": str(err)
            }), 500

        except Exception as err:
            print('Something went wrong while updating data into database!\n',err);
            self.conn.rollback();
            return jsonify({
                "success": False,
                "message": f'Error while updating user {user_id}!',
                "error": str(err)
            }), 500;

    def deleteUser(self, user_id):
        try:
            query = "DELETE FROM `users` WHERE id=%s";
            values = (user_id,);
            self.cursor.execute(query, values)

            self.conn.commit();


            if self.cursor.rowcount > 0:
                return jsonify({
                    "success": True,
                    "message": f"user account successfully deleted for id[{user_id}].",
                    "affected_rows": self.cursor.rowcount
                }),200;
        
            return jsonify({
                "success": False,
                "message": "user not found or no changes made."
            }),404;
    
        except mysql.connector.Error as err:
            # If something goes wrong, undo any partial changes
            self.conn.rollback() 
            return jsonify({
                "success": False,
                "message": "Database error",
                "error": str(err)
            }), 500

        except Exception as err:
            print('Something went wrong while deleting user account!\n',err);
            self.conn.rollback();
            return jsonify({
                "success": False,
                "message": f'Error while deleting user account for id {user_id}!',
                "error": str(err)
            }), 500;
