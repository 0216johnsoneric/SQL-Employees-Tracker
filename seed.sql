/*mysql -u root -p < seed.sql*/ 
-- DROP TABLE employees;
USE employee_tracker_DB;

INSERT INTO departments(name)
VALUES ("Engineering"), ("Finance"), ("Sales"), ("Legal");

SELECT * FROM departments;

INSERT INTO roles(title, salary, department_id)
VALUES 
("Lead Engineer", 150000.00, 1),
("Software Engineer", 100000.00, 1),
("Accountant", 90000.00, 2),
("Sales Lead", 75000.00, 3),
("Legal Team Lead", 175000.0, 4);
("Lawyer", 130000.00, 4),


SELECT * FROM roles;

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES
("Alan", "Kay", 1, NULL),
("Jack", "Dorsey", 1, 1),
("Warren", "Buffett", 2, NULL),
("Bob", "Dole", 3, NULL),
("Bill", "Clinton", 4, NULL),
("Al", "Gore", 4, 5);

SELECT * FROM employees;

SELECT roles.title, roles.salary, departments.name
FROM departments JOIN roles ON roles.department_id = departments.id;

SELECT employees.id, employees.first_name, employees.last_name, roles.title,
departments.name, roles.salary, employees.manager_id
FROM departments
INNER JOIN roles ON roles.department_id = departments.id
INNER JOIN employees ON employees.role_id = roles.id;