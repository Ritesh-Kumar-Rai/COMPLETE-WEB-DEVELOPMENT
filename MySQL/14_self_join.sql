# SELF JOIN In MySQL 

/*
A Self JOIN is a regular join, but the table is joined with itself.
This is useful when rows in the same table are related to each other. For example,
when users refer other users, and we store the ID of the person who referred them
in the same users table.
*/

-- Step 1: Add a referred_by_id Column
ALTER TABLE users
ADD COLUMN referred_by_id INT;

-- Step 2: Insert Referral Data (Optional)
UPDATE users SET referred_by_id = 1 WHERE id IN (2, 3, 7, 10,21,19,31,28,26); -- User 1 referred Users 2 and 3
UPDATE users SET referred_by_id = 2 WHERE id = 9; -- User 2 referred User 4


-- get name of users who referred by some other user
SELECT a.id, a.name AS user_name, b.name AS referred_by
FROM users a 
INNER JOIN users b ON a.referred_by_id = b.id;


SELECT * FROM users;