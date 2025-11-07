# Working with Tables in MySQL (Practice)


-- equal to
SELECT * FROM users WHERE gender = 'Others';

-- not equal to
SELECT * FROM users WHERE gender != 'Male';
SELECT * FROM users WHERE gender <> 'Female';

-- greater than/less than
SELECT * FROM users WHERE salary > 70000;
SELECT * FROM users WHERE salary < 55000;

-- greater equal/ less equal
SELECT * FROM users WHERE salary >= 70000;
SELECT * FROM users WHERE salary <= 55000;

-- IS NULL & IS NOT NULL
SELECT * FROM users WHERE salary IS NULL;
SELECT * FROM users WHERE salary IS NOT NULL;

-- BETWEEN
SELECT * FROM users WHERE date_of_birth BETWEEN '1990-01-01' AND '1992-12-28';

-- IN
SELECT * FROM users WHERE salary IN (84000, 77000, 50000);

-- NOT IN 
SELECT * FROM users WHERE gender NOT IN ('Male', 'Female'); 

-- AND/OR
SELECT * FROM users WHERE gender = 'Male' AND salary > 70000;
SELECT * FROM users WHERE gender = 'Male' OR salary > 70000;

-- ORDER BY
SELECT * FROM users ORDER BY date_of_birth;
SELECT * FROM users ORDER BY salary DESC;

-- LIMIT/OFFSET
SELECT * FROM users ORDER BY salary DESC LIMIT 3;
SELECT * FROM users ORDER BY salary DESC LIMIT 3 OFFSET 3;
SELECT * FROM users ORDER BY salary DESC LIMIT 3,3; -- LIMIT OFFSET, LIMIT (shortcut)

-- LIKE 
SELECT * FROM users WHERE name LIKE 'A%';
SELECT * FROM users WHERE name LIKE '%a';
SELECT * FROM users WHERE name LIKE '%ar%';

SELECT * FROM users WHERE name LIKE '_r%';
SELECT * FROM users WHERE name LIKE '%r_';

