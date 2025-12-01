# MySQL Indexes
/*
Indexes in MySQL are used to speed up data retrieval. They work like the index of
a book — helping the database engine find rows faster, especially for searches,
filters, and joins.
*/

-- View Indexes on a Table 
SHOW INDEXES FROM users;

-- Creating a Single-Column Index
CREATE INDEX idx_email ON users(email); -- for the query where the query is done by email

SELECT * FROM users WHERE email = '';

-- Creating a Multi-Column Index
CREATE INDEX idx_on_gender_email ON users(gender, email);

SELECT * FROM users 
WHERE gender = 'Female' AND salary > 70000;

-- Index Order matters first gender than salary while executing a query


-- Dropping an Index 
DROP INDEX idx_email ON users;