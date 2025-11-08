# Removing Data from a Table
-- The DELETE statement removes rows from a table.

-- Basic Syntax
-- DELETE FROM table_name WHERE condition;

-- 1.  Delete One Row
DELETE FROM users WHERE id = 3;

-- 2. Delete Multiple Rows
DELETE FROM users WHERE gender = 'Others';
DELETE FROM users WHERE salary IS NULL;

-- 3. Delete All Rows (but keep table structure)
DELETE FROM users;

-- Drop the Entire Table (use with caution)
DROP TABLE users; -- This removes the table structure and all data permanently


# Best Practices
/*
Always use WHERE unless you’re intentionally updating/deleting everything.
Consider running a SELECT with the same WHERE clause first to confirm what
will be affected:
SELECT * FROM users WHERE id = 3;

Always back up important data before performing destructive operations.
*/

-- Practice

-- 1. delete user which has salary less than 50000
-- DELETE FROM users WHERE salary < 50000;

-- 2. delete user which has salary as NULL
-- DELETE FROM users WHERE salary IS NULL;