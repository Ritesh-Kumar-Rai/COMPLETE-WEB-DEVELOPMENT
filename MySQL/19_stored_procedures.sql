# Stored Procedures in MySQL
/*
A stored procedure is a saved SQL block that can be executed later. It’s useful
when you want to encapsulate logic that can be reused multiple times — like
queries, updates, or conditional operations.
*/

USE startersql;

-- Create a procedure to select from users
DELIMITER $$

CREATE PROCEDURE get_users()
BEGIN
    SELECT * FROM users;
END $$
DELIMITER ;

-- call the procedure 
CALL get_users();


-- Creating a Procedure with Input Parameters

DELIMITER $$

CREATE PROCEDURE AddUser(
    IN p_name VARCHAR(100),
    IN p_email VARCHAR(100),
    IN p_gender ENUM('Male', 'Female', 'Others'),
    IN p_dob DATE,
    IN p_salary DECIMAL(10,2),
    IN p_referred_by_id INT
)
BEGIN
    INSERT INTO users(name, email, gender,date_of_birth, salary, referred_by_id) 
    VALUES (p_name, p_email, p_gender, p_dob, p_salary, p_referred_by_id);
END $$

DELIMITER ;

-- Viewing Stored Procedures
SHOW PROCEDURE STATUS WHERE Db='startersql';

-- Dropping a Stored Procedure
DROP PROCEDURE IF EXISTS AddUser;