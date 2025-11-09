# HERE i will learn in deep about how can we modify table/database

-- We will use ALTER TABLE table_name to modify or change the table column, type, value [like default] or constraints

-- 1. Add a new column:
ALTER TABLE users ADD COLUMN phone_number INTEGER;
-- 🧠 Remember: ADD COLUMN = add something new.

-- 2. Modify an existing column: 
ALTER TABLE users MODIFY COLUMN phone_number VARCHAR(15);
-- 🧠 Remember: MODIFY = change the type, size, or constraints.

-- 3. Rename a column:
ALTER TABLE users RENAME COLUMN name TO full_name;
-- 🧠 Remember: RENAME COLUMN old TO new

-- 4. Drop (delete) a column:
ALTER TABLE users DROP COLUMN phone_number;
-- 🧠 Remember: DROP = delete permanently (⚠️ careful!)

-- 5. Add / Drop a constraint:
ALTER TABLE users ADD CONSTRAINT chk_age (age >= 18);
ALTER TABLE users DROP CONSTRAINT chk_age;
-- 🧠 Remember: ADD CONSTRAINT / DROP CONSTRAINT


-- 6. Rename the entire table:
RENAME TABLE users TO programmers;
-- 🧠 Remember: RENAME TABLE old TO new

-- 7. DROP — Delete table or database (Be careful!): 
DROP TABLE programmers;
DROP DATABASE startersql;
-- 🧠 Remember: “DROP = Gone Forever!”


-- 8. 4️⃣ TRUNCATE — Empty the table, keep the structure:
TRUNCATE TABLE programmers;
-- 💡 Think: “Clear all data, but keep the table ready for new data.”

-- 9. CHANGE (Similar to MODIFY):
ALTER TABLE students CHANGE COLUMN name full_name VARCHAR(100);
-- 🧠 Think: “CHANGE = Rename + Modify together”