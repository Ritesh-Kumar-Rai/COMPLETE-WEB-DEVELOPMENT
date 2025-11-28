# UNION & UNION ALL in MySQL

/*
The UNION operator in SQL is used to combine the result sets of two or more
SELECT statements. It removes duplicates by default.
If you want to include all rows including duplicates, use UNION ALL .
*/

-- 1. Create a Table 'admin_users'
CREATE TABLE admin_users (
id INT PRIMARY KEY,
 name VARCHAR(100),
 email VARCHAR(100),
 gender ENUM('Male', 'Female', 'Other'),
 date_of_birth DATE,
 salary INT
);

-- 2. Insert Sample Data into admin_users
INSERT INTO admin_users (id, name, email, gender, date_of_birth, salary) VALUES
(101, 'Anil Kumar', 'anil@example.com', 'Male', '1985-04-12', 60000),
(102, 'Pooja Sharma', 'pooja@example.com', 'Female', '1992-09-20', 58000),
(103, 'Rakesh Yadav', 'rakesh@example.com', 'Male', '1989-11-05', 54000),
(104, 'Fatima Begum', 'fatima@example.com', 'Female', '1990-06-30', 62000);


-- UNION
SELECT name FROM users
UNION
SELECT name FROM admin_users;

-- UNION ALL
SELECT name FROM users 
UNION ALL 
SELECT name FROM admin_users;


-- More than 2 columns
SELECT name, salary FROM users 
UNION
SELECT name, salary FROM admin_users;

-- Adding Separate Roles
SELECT name, salary, 'User' AS Role FROM users
UNION
SELECT name, salary, 'Admin' AS Role FROM admin_users; 

-- Using ORDER BY
SELECT name, salary, 'User' AS Role FROM users
UNION
SELECT name, salary, 'Admin' AS Role FROM admin_users
ORDER BY salary DESC;


/*
* Rules of UNION:

The number of columns and their data types must match in all SELECT
statements.
UNION removes duplicates by default.
UNION ALL keeps duplicates.
*/