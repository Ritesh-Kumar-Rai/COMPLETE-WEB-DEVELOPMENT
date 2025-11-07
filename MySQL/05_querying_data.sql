SELECT * FROM users;

# Filtering Rows with WHERE

-- 1. Equal To
SELECT * FROM users WHERE gender = 'Male';

-- 2. Not Equal To
SELECT * FROM users WHERE gender != 'Female';
-- or
SELECT * FROM users WHERE gender <> 'Female';

-- 3. Greater Than / Less Than
SELECT * FROM users WHERE date_of_birth < '1995-01-01';
SELECT * FROM users WHERE id > 10;

-- 4. Greater Than or Equal / Less Than or Equal
SELECT * FROM users WHERE id >= 5;
SELECT * FROM users WHERE id <= 20;

-- 5. IS NULL
SELECT * FROM users WHERE salary IS NULL;

-- 6. IS NOT NULL
SELECT * FROM users WHERE date_of_birth IS NOT NULL;

-- 7. BETWEEN   
SELECT * FROM users WHERE date_of_birth BETWEEN '1990-01-01' AND '2000-12-31';

-- 8. IN/NOT IN 
SELECT * FROM users WHERE gender IN ('Male', 'Other');
SELECT * FROM users WHERE gender NOT IN ('Male', 'Others');

-- 9. AND/OR
SELECT * FROM users WHERE gender = 'Female' AND date_of_birth > '1990-01-01';
SELECT * FROM users WHERE gender = 'Male' OR gender = 'Other';

-- 10. ORDER BY
SELECT * FROM users ORDER BY date_of_birth ASC;
SELECT * FROM users ORDER BY name DESC;

-- 11. LIMIT
SELECT * FROM users LIMIT 5; -- Top 5 rows
SELECT * FROM users LIMIT 10 OFFSET 5; -- Skip first 5 rows, then get next 10
SELECT * FROM users LIMIT 5, 10; -- Get 10 rows starting from the 6th row (Same as above)
SELECT * FROM users ORDER BY created_at DESC LIMIT 10;

-- 12. LIKE
SELECT * FROM users WHERE name LIKE 'A%'; -- Starts with A
SELECT * FROM users WHERE name LIKE '%a'; -- Ends with a
SELECT * FROM users WHERE name LIKE '%li%'; -- Contains 'li'
-- it is case-insensitive
SELECT * FROM users WHERE name LIKE '_a%'; -- contains 'a' at second position
SELECT * FROM users WHERE name LIKE '%a_'; -- contains 'a' at second last position
-- _ underscore for skipping position

