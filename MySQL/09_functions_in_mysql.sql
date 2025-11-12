# Functions in MySQL

# 5 Categories of Functions in MYSQL -> Numeric, String, Aggregate, System, Date & Time

-- (A) Aggregate Functions:

-- 1. COUNT()
SELECT COUNT(*) FROM users;
SELECT COUNT(*) FROM users WHERE gender = 'MALE';

-- 2. MIN()/MAX()
SELECT MAX(salary) AS MAX_SALARY, MIN(salary) AS MIN_SALARY FROM users;

-- 3. SUM()
SELECT SUM(salary) AS total_payroll FROM users;

-- 4. AVG()
SELECT AVG(salary) AS avg_salary FROM users;

-- Grouping with GROUP BY: Average salary by gender:
SELECT gender, AVG(salary) AS AVG_SALARY FROM users
GROUP BY gender;

-- (B) String Functions:

-- 1. LENGTH()
SELECT name, LENGTH(name) FROM users;

-- 2. LOWER() and UPPER()
SELECT UPPER(email), LOWER(name) FROM users;

-- 3. CONCAT()
SELECT id, name, CONCAT(name, id, '_', FLOOR(RAND() * 1000)) AS username FROM users;

-- 4. REPLACE(whole_str, old, new
SELECT name, email, REPLACE(email, 'example', 'mysql') AS REPLACED_EMAIL_ID FROM users;

-- (C) Date Functions: 

-- 1. NOW()
SELECT NOW();

-- 2. CURDATE()
SELECT CURDATE();

-- 3. YEAR() , MONTH() , DAY()
SELECT name, date_of_birth, YEAR(date_of_birth), MONTH(date_of_birth), DAY(date_of_birth) FROM users;

-- 4. DATEDIFF()
SELECT name, DATEDIFF(CURDATE(), date_of_birth) AS days_worked FROM users;

-- 5. TIMESTAMPDIFF()
SELECT name, TIMESTAMPDIFF(YEAR, date_of_birth, CURDATE()) AS current_age FROM users;

-- 6. CURTIME()
SELECT CURTIME();

-- (D) Mathematical Functions:

SET @x = 12.940893; -- variable

-- 1. ROUND() , FLOOR() , CEIL()
SELECT ROUND(@x, 2), FLOOR(@x), CEIL(@x);

-- 2. MOD()
SELECT MOD(2,2);

-- 3. ABS()
SELECT ABS(-120);

-- 4. ROUND(x, decimal)
SELECT ROUND(108.6748492494, 2);

-- (E) SYSTEM FUNCTIONS:

-- 1. USER()
SELECT USER() AS user;

-- 2. DATABASE()
SELECT DATABASE();

-- 3. VERSION()
SELECT VERSION();

-- 4. LAST_INSERT_ID()
SELECT LAST_INSERT_ID();

--  Conditional Functions
-- IF()
SELECT name, gender,
IF(gender = 'Female', 'Yes', 'No') AS is_Female
FROM users;
