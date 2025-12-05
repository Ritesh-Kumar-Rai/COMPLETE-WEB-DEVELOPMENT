# Triggers in MySQL
/*
A trigger is a special kind of stored program that is automatically executed
(triggered) when a specific event occurs in a table — such as INSERT , UPDATE , or DELETE .

-Triggers are commonly used for:
    - Logging changes
    - Enforcing additional business rules
    - Automatically updating related data
*/

-- Basic Trigger Structure
/*
CREATE TRIGGER trigger_name
AFTER INSERT ON table_name
FOR EACH ROW
BEGIN
-- statements to execute
END;

- Triggers can be fired:
    - BEFORE or AFTER an event
    - On INSERT , UPDATE , or DELETE
*/

-- Step 1. Create the Log Table
CREATE TABLE user_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    name VARCHAR(100),
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Step 2: Create the Trigger
DELIMITER $$
CREATE TRIGGER after_insert_add
AFTER INSERT ON users
FOR EACH ROW
BEGIN
    INSERT INTO user_log(user_id, name)
    VALUES (NEW.id, NEW.name);
END $$
DELIMITER ;


-- Step 3: Test the Trigger
CALL AddUser('Ritika Jain', 'ritika@example.com', 'Female', '1996-03-12', 74000);

-- now check for user_log table:
SELECT * FROM user_log;


-- Dropping a Trigger
DROP TRIGGER IF EXISTS after_insert_add;