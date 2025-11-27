# SQL JOINS in MySQL
-- In SQL, JOINs are used to combine rows from two or more tables based on related columns — usually a foreign key in one table referencing a primary key in another

-- 1. INNER JOIN [returns only those data which are exists in both table]
SELECT users.id AS user_id, users.name, addresses.city, addresses.state, addresses.id AS Address_id 
FROM users 
INNER JOIN addresses ON addresses.user_id = users.id;

-- 2. LEFT JOIN [returns all exists data as well as non-matched data from left table]
SELECT users.name, addresses.city, addresses.state
FROM users 
LEFT JOIN addresses ON addresses.user_id = users.id;

-- 3. RIGHT JOIN [returns all exists data as well as non-matched data from right table]
SELECT users.id AS user_id, users.name, addresses.city 
FROM users 
RIGHT JOIN addresses ON addresses.user_id = users.id; 