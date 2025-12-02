# Subqueries in MySQL
/*
A subquery is a query nested inside another query. Subqueries are useful for
breaking down complex problems into smaller parts.
They can be used in:

SELECT statements
WHERE clauses
FROM clauses
*/

-- Scalar Subquery Example
SELECT id, name, salary FROM users WHERE salary > (SELECT AVG(salary) FROM users);

-- Subquery in IN 
SELECT id, name, referred_by_id
FROM users
WHERE referred_by_id IN (
 SELECT id FROM users WHERE salary IS NULL
);

SELECT id, name, salary, (SELECT AVG(salary) FROM users) AS average_salary
FROM users; 