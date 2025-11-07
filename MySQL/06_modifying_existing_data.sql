# UPDATE - Modifying Existing Data

-- The UPDATE statement is used to change values in one or more rows.

-- Syntax:
/*
    UPDATE table_name
    SET column1 = value1, column2 = value2
    WHERE condition;
*/

-- Update One Column
UPDATE users
SET name = 'Alicia'
WHERE id = 1;

--  Update Multiple Columns
UPDATE users
SET name = 'Robert', email = 'robert@example.com'
WHERE id = 2;

-- UPDATE users SET gender = 'Other'; warning don't use because it will modify all rows
