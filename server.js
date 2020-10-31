const mysql = require("mysql");
const inquirer = require("inquirer");
// const DbHelpers = require("./util/DbHelpers");

// const dbHelpers = new DbHelpers();

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employee_tracker_DB",
});

connection.connect(async (err) => {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  await start();
});