/*
# Relivator - A game shop where peoples can purchase 
video-games cd's/key + gaming accessories, consoles, laptops,
furnitures like gaming desk, audio systems [including headphones],
and related goods.
* It's a retail shop website for retail owner
* My personal project
*/


CREATE DATABASE IF NOT EXISTS relivator_store; -- a game store 

USE relivator_store;

# users table
CREATE TABLE IF NOT EXISTS users(
	id INT PRIMARY KEY AUTO_INCREMENT,
    fullname VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- hashed
    isAdmin BOOLEAN DEFAULT 0,
    refresh_token TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,	
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories(
	id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    tags JSON,
    slug VARCHAR(100),
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products(
	id INT PRIMARY KEY AUTO_INCREMENT,
    product_name VARCHAR(255) NOT NULL,
    description TEXT,
    features JSON,
    specifications JSON,
    brand VARCHAR(50),
    model_year YEAR,
    base_price DECIMAL(10,2) NOT NULL DEFAULT 0,
    discount_percent DECIMAL(4,2) DEFAULT 0.00,
    stock_quantity INT DEFAULT 1,
    rating DECIMAL(4,2) DEFAULT 0.00,
    rating_count INT DEFAULT 0,
    category INT NULL,
    image_url VARCHAR(255),
    is_active BOOLEAN DEFAULT 1, -- used to hide from search results or from users if `false` [controlled/manages by manual querying]
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category) REFERENCES categories(id) ON UPDATE CASCADE ON DELETE SET NULL 
);


CREATE TABLE IF NOT EXISTS wishlists(
	id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NULL,
    product_id INT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS cart(
	id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NULL,
    product_id INT NULL,
    quantity INT DEFAULT 1,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE CASCADE ON DELETE CASCADE    
);

# 1. Orders Table (The Summary)
CREATE TABLE IF NOT EXISTS orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    tax_amount DECIMAL(10,2) NOT NULL,
    shipping_charges DECIMAL(10,2) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'paid', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    payment_method VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE SET NULL
);

# 2. Order Items Table (The Details)
CREATE TABLE IF NOT EXISTS order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price_at_purchase DECIMAL(10,2) NOT NULL, -- Fixed price at time of sale
    FOREIGN KEY (order_id) REFERENCES orders(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE CASCADE
);


# site settings for tax_rate and shipping charges etc..
CREATE TABLE IF NOT EXISTS site_settings(
	id INT PRIMARY KEY AUTO_INCREMENT,
    tax_percent DECIMAL(5,2) DEFAULT 18.00, -- a GST tax (indian currency INR)
    shipping_fee DECIMAL(10,2) DEFAULT 40.00, -- ₹40 rupees delivery charges
    free_shipping_threshold DECIMAL(10,2) DEFAULT 5000.00 -- shipping charges will become free when ordered_price >= ₹5000
);

INSERT INTO site_settings (id, tax_percent, shipping_fee, free_shipping_threshold) 
VALUES (1, 18.00, 40.00, 5000.00)
ON DUPLICATE KEY UPDATE id=id;




