/*mysql -u root -p < seed.sql*/ 

-- DROP TABLE employees;
USE employee_tracker_DB;

INSERT INTO departments(name)
VALUES ("Engineering"), ("Finance"), ("Sales"), ("Legal");

-- SELECT * FROM departments;

INSERT INTO roles(title, salary, department_id)
VALUES 
("Lead Engineer", 150000.00, 1),
("Software Engineer", 100000.00, 1),
("Accountant", 90000.00, 2),
("Sales Lead", 75000.00, 3),
("Legal Team Lead", 175000.0, 4),
("Lawyer", 130000.00, 4);


-- SELECT * FROM roles;

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES
("Alan", "Kay", 1, 1),
("Jack", "Dorsey", 2, NULL),
("Warren", "Buffett", 3, NULL),
("Bob", "Dole", 4, NULL),
("Bill", "Clinton", 5, 2),
("Al", "Gore", 6, NULL);

-- SELECT * FROM employees;

-- SELECT roles.title, roles.salary, departments.name
-- FROM departments JOIN roles ON roles.department_id = departments.id;

-- SELECT employees.id, employees.first_name, employees.last_name, roles.title,
-- departments.name, roles.salary, employees.manager_id
-- FROM departments
-- INNER JOIN roles ON roles.department_id = departments.id
-- INNER JOIN employees ON employees.role_id = roles.id;