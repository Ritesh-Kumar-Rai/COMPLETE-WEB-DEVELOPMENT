# Foreign Key in MySQL 
-- It is used to connect 2 tables together by using a same id like primary key of parent table and that key will use in child table for connection of row/table

-- CREATE A TABLE with Foreign Key
CREATE TABLE IF NOT EXISTS addresses(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    street VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    FOREIGN KEY (user_id) REFERENCES users(id) -- simple but not a good practice, will cause issues while dropping it. Instead use below
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id), -- not add ON DELETE action
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE/SET NULL/RESTRICT  
);

-- to drop it, use constraint name
ALTER TABLE addresses
DROP FOREIGN KEY fk_user; 

-- Adding a Foreign Key Later (Using ALTER)
ALTER TABLE addresses
ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id);

-- Adding a Foreign Key Later (Using ALTER) with ON DELETE Action
ALTER TABLE addresses
ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;


-- Demo Initial datasets
/*
INSERT INTO addresses (user_id, street, city, state, pincode)
VALUES
(1, '221B MG Road', 'Mumbai', 'Maharashtra', '400001'),
(22, '14 Park Street', 'Kolkata', 'West Bengal', '700016'),
(33, '32 Residency Road', 'Bengaluru', 'Karnataka', '560025'),
(24, '5 North Usman Road', 'Chennai', 'Tamil Nadu', '600017'),
(25, '17 Hazratganj', 'Lucknow', 'Uttar Pradesh', '226001'),
(26, '55 Banjara Hills', 'Hyderabad', 'Telangana', '500034'),
(7, '88 Connaught Place', 'Delhi', 'Delhi', '110001'),
(8, '10 MG Marg', 'Dehradun', 'Uttarakhand', '248001'),
(9, '23 Brigade Road', 'Bengaluru', 'Karnataka', '560025'),
(10, '45 Marine Drive', 'Mumbai', 'Maharashtra', '400020'),
(11, '67 Ashoka Road', 'Delhi', 'Delhi', '110001'),
(12, '89 MG Road', 'Pune', 'Maharashtra', '411001'),
(13, '12 Brigade Road', 'Bengaluru', 'Karnataka', '560025'),
(14, '34 Park Street', 'Kolkata', 'West Bengal', '700016'),
(15, '56 Connaught Place', 'Delhi', 'Delhi', '110001'),
(16, '78 Marine Drive', 'Mumbai', 'Maharashtra', '400020'),
(17, '90 MG Marg', 'Dehradun', 'Uttarakhand', '248001'),
(18, '11 North Usman Road', 'Chennai', 'Tamil Nadu', '600017'),
(19, '33 Residency Road', 'Bengaluru', 'Karnataka', '560025'),
(20, '22 Hazratganj', 'Lucknow', 'Uttar Pradesh', '226001');
*/