const inquirer = require("inquirer");
const Department = require("./lib/Department");

class inqHelpers {
  
  async viewAll(cntn) {
    try {
      let query =
        "SELECT employees.id, employees.first_name, employees.last_name, roles.title, ";
      query += "departments.name, roles.salary, employees.manager_id ";
      query += "FROM departments ";
      query += "INNER JOIN roles ON roles.department_id = departments.id ";
      query += "INNER JOIN employees ON employees.role_id = roles.id ";
      query += "ORDER BY employees.id ASC";
      console.log("Viewing all employees... \n");
      await cntn.query(query, (err, res) => {
        if (err) throw err;
        console.log("\n");
        console.table(res);
      });
    } catch (err) {
      throw err;
    }
  }

  async viewByDept(cntn) {
    try {
      const selectDept = await inquirer.prompt({
        type: "list",
        name: "viewDept",
        message: "Which department would you like to view?",
        choices: ["Engineering", "Finance", "Sales", "Legal"],
      });
      const { viewDept } = selectDept;

      const deptChoice = this.handleDept(viewDept);

      let query =
        "SELECT employees.id, employees.first_name, employees.last_name, roles.title, ";
      query += "departments.name, roles.salary, employees.manager_id ";
      query += "FROM departments ";
      query += "INNER JOIN roles ON roles.department_id = departments.id ";
      query += "INNER JOIN employees ON employees.role_id = roles.id ";
      query += "WHERE roles.department_id = " + deptChoice;
      query += " ORDER BY employees.id ASC";

      await cntn.query(query, (err, res) => {
        if (err) throw err;
        console.log("\n");
        console.table(res);
      });
    } catch (err) {
      throw err;
    }
  }

  handleDept(dept) {
    switch (dept) {
      case "Engineering":
        return 1;
      case "Finance":
        return 2;
      case "Sales":
        return 3;
      case "Legal":
        return 4;
    }
  }

  async addEmployee(cntn) {
    console.log("Adding another employee... \n");

    const newEmployee = await inquirer.prompt([
      {
        type: "input",
        name: "first_name",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "last_name",
        message: "What is the employee's last name?",
      },
      {
        type: "list",
        name: "role_id",
        message: "What is the employee's role?",
        choices: [
            "Lead Engineer",
            "Software Engineer",
            "Accountant",
            "Sales Lead",
            "Legal Team Lead",
            "Lawyer",
        ],
      },
      {
        type: "input",
        name: "manager_id",
        message: "Who is the employee's manager?",
      },
    ]);
    console.log(newEmployee);

    const { first_name, last_name, role_id, manager_id } = newEmployee;
    cntn.query(
      "INSERT INTO employees SET ?",
      {
        first_name: first_name,
        last_name: last_name,
        role_id: this.handleRole(role_id),
        manager_id: manager_id,
      },
      (err, res) => {
        if (err) throw err;
        console.log(res.affectedRows + " employees inserted!\n");
      }
    );
    await this.viewAll(cntn);
  }

  handleRole(answer) {
    switch (answer) {
      case "Lead Engineer":
        return 1;
      case "Software Engineer":
        return 2;
      case "Accountant":
        return 3;
      case "Sales Lead":
        return 4;
      case "Legal Team Lead":
        return 5;
      case "Lawyer":
        return 6;
      case "New Role":
        return 7;
    }
  }

  async addRole(cntn) {
    console.log("Adding another role... \n");

    const newRole = await inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "What is the role's name?",
      },
       {
        type: "list",
        name: "department_id",
        message: "What is the role's department?",
        choices: [
            "Engineering",
            "Finance",
            "Sales",
            "Legal",
        ],
      },  
      ]);
      console.log(newRole);
      const { title, department_id } = newRole;
      cntn.query(
      "INSERT INTO roles SET ?",
      {
        title: title,
        department_id: this.handleDept(department_id),
        // role_id: this.handleRole(role_id),
        // manager_id: manager_id,
      },
      (err, res) => {
        if (err) throw err;
        console.log(res.affectedRows + " role inserted!\n");
      }
    );
    await this.viewAll(cntn);
  }

  async addDept(cntn) {
    console.log("Adding another department... \n");
    const newDept = await inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "What is the department's name?",
      },
      {
        type: "list",
        name: "role_id",
        message: "What is the employee's department role?",
        choices: [
            "Lead Engineer",
            "Software Engineer",
            "Accountant",
            "Sales Lead",
            "Legal Team Lead",
            "Lawyer",
        ],
      },
      ]);
      console.log(newDept);
      const { title, role_id } = newDept;
      cntn.query(
      "INSERT INTO departments SET ?",
      {
        title: title,
        role_id: this.handleRole(role_id),
        // manager_id: manager_id,
      },
      (err, res) => {
        if (err) throw err;
        console.log(res.affectedRows + " department inserted!\n");
      }
    );
    await this.viewAll(cntn);
  }
}

module.exports = inqHelpers;
