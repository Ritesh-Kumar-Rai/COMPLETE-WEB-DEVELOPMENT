# Practice UPDATE table 

-- 1. Update the salary of user with id = 5 to ₹70,000.
UPDATE users SET salary = 70000 WHERE id=5;

-- 2. Change the name of the user with email aisha@example.com to Aisha Khan.
UPDATE users SET name = 'Aisha Khan' WHERE email = 'aisha@example.com';

-- 3. Increase salary by ₹10,000 for all users whose salary is less than ₹60,000.
UPDATE users SET salary = salary + 10000 WHERE salary < 60000;

-- 4. Set the gender of user Ishaan to Others.
UPDATE users SET gender = 'Others' WHERE name = 'Ishaan';

-- 5. Reset salary of all users to ₹50,000 (Careful - affects all rows).
-- UPDATE users SET salary = 50000;