# SQL Employee's Tracker
<img src="assets/images/Screen Shot 2020-10-31 at 5.47.49 PM.png">

## Instructions
1) Clone lab: git clone git@github.com:0216johnsoneric/SQL-Employees-Tracker.git
2) Install node.js libraries with npm install
3) Run mysql -u root -p < schema.sql and mysql -u root -p < seed.sql to load database  
3) Open server.js in intergrated terminal
4) Run node server.js
5) Select appropriate CLI inquirer prompt answers.

## About
This is a CLI application that is build to be a solution for managing a company's employees database. It implements node, inquirer, and MySQL.
The database schema contains three tables: Department(id, name), Role(id, title, salary, dept_id), and Employee(id, first_name, last_name, role_id, manager_id).
<img src="assets/images/schema-1.png">
The CLI application allows the user to:
1) View all Employee information 
2) View Employee information by Department
3) Add Employee, Role, or Department

