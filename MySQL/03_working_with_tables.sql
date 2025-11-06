# Working with Tables in MySQL 

-- 1. Selecting data from table
SELECT * FROM users;
SELECT name, email FROM users;

-- 2. Renaming Table
RENAME TABLE users to programmers; -- To rename an existing table
RENAME TABLE programmers to users; -- To rename it back

-- 3. Altering a Table
ALTER TABLE users ADD COLUMN is_active BOOLEAN DEFAULT TRUE; -- add a column
ALTER TABLE users DROP COLUMN is_active; -- drop a column
ALTER TABLE users MODIFY COLUMN name VARCHAR(150); -- modify a column type

-- Move a Column to the First Position
ALTER TABLE users MODIFY COLUMN email VARCHAR(100) FIRST; -- move `email` column to first position
ALTER TABLE users MODIFY COLUMN gender ENUM('Male', 'Female', 'Other') AFTER name; -- move gender column after name column