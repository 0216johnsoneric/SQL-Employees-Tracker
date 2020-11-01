const mysql = require("mysql");
const inquirer = require("inquirer");
const inqHelpers = require("./inqHelpers");

const helpers = new inqHelpers();

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "employee_tracker_DB",
});

connection.connect(async (err) => {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  await start();
});

async function start() {
  try {
    const todo = await inquirer.prompt({
      type: "list",
      message: "What would you like to do?",
      name: "userChoice",
      choices: [
        "View all Employees",
        "View all Employees by Department",
        "Add Employee",
        "Add Role",
        "Add Department",
      ],
    });
    const { userChoice } = todo;
    switch (userChoice) {
      case "View all Employees":
        await helpers.viewAll(connection);
        await start();
        break;
      case "View all Employees by Department":
        await helpers.viewByDept(connection);
        await start();
        break;
      case "Add Employee":
        await helpers.addEmployee(connection);
        await start();
        break;
      case "Add Role":
        await helpers.addRole(connection);
        await start();
        break;
        
      case "Add Dept":
        await helpers.addDept(connection);
        await start();
        break;

      default:
        break;
    }
    return userChoice;
  } catch (err) {
    throw err;
  }
}
