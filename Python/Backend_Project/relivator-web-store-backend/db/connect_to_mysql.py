import mysql.connector
from mysql.connector import pooling
import os

# Database configuration
db_config = {
    "host": "localhost",
    "user": "root",
    "password": os.getenv("MYSQL_DATABASE_PASSWORD"),
    "database": os.getenv("MYSQL_DATABASE_NAME")
}

try:
    # Create a Connection Pool
    # pool_size=5 means 5 connections are always ready
    connection_pool = mysql.connector.pooling.MySQLConnectionPool(
        pool_name="relivator_pool",
        pool_size=5,
        pool_reset_session=True,    # CLEANS the connection before giving it to a new user
        **db_config
    )
    print("🍃 Database Connection Pool created successfully.")
except mysql.connector.Error as err:
    print(f"❌ Error while connecting to MySQL -> {err}")

def get_db_connection():
    """Returns a connection from the pool."""
    return connection_pool.get_connection()

