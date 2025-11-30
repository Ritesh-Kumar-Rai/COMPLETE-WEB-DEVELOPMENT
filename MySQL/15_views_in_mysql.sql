# MySQL Views

/*
A view in MySQL is a virtual table based on the result of a SELECT query. It does
not store data itself — it always reflects the current data in the base tables.
Views are useful when:
You want to simplify complex queries
You want to reuse logic
You want to hide certain columns from users
You want a “live snapshot” of filtered data
*/


-- Creating a View
CREATE VIEW rich_salary_users AS 
SELECT id, name, salary 
FROM users 
WHERE salary > 70000;


-- Querying the View
SELECT * FROM rich_salary_users;

-- Dropping a View
DROP VIEW rich_salary_users;