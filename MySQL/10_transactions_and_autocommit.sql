# MySQL Transactions and AutoCommit

-- To disable AutoCommit:
SET autocommit = 0;

-- To commit a transaction:
COMMIT;

-- To rollback a transaction:
ROLLBACK;

# Example Workflow

-- Turn Off AutoCommit
SET autocommit = 0;

-- make some changes
UPDATE TABLE users SET salary = 80000 WHERE id = 5;

-- if you are happy then commit
COMMIT;
-- else
ROLLBACK;

-- Enabling AutoCommit Again
SET autocommit = 1;
