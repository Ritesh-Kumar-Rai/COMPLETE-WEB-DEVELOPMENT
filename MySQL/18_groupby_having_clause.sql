# GROUP BY and HAVING in MySQL
/*
The GROUP BY clause is used to group rows that have the same values in
specified columns. It is typically used with aggregate functions like COUNT , SUM ,
AVG , MIN , or MAX .
The HAVING clause is used to filter groups after aggregation — similar to how
WHERE filters individual rows.
*/

-- Average Salary by Gender
SELECT gender, AVG(salary) AS 'Average Salary'
FROM users 
GROUP BY gender;

# GROUP BY with COUNT

-- Find how many users were referred by each user:
SELECT referred_by_id, COUNT(*) AS 'Total Reffered Peoples'
FROM users 
WHERE referred_by_id IS NOT NULL
GROUP BY referred_by_id;


# HAVING Clause: Filtering Groups

-- Let’s say we only want to show genders where the average salary is greater than ₹75,000.
SELECT gender, GROUP_CONCAT(name), AVG(salary) AS 'Average Salary'
FROM users 
GROUP BY gender 
HAVING AVG(salary) > 55000;

-- Groups with More Than 1 Referral
SELECT referred_by_id, COUNT(*) AS total_referred
FROM users
WHERE referred_by_id IS NOT NULL
GROUP BY referred_by_id
HAVING COUNT(*) > 1;


# ROLLUP
-- To get subtotals and grand totals, you can use ROLLUP :
SELECT gender, AVG(salary) AS avg_salary, COUNT(*) AS 'total users'
FROM users GROUP BY gender WITH ROLLUP; 