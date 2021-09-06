const mysql = require("mysql2");
const cTable = require("console.table");
const inquirer = require("inquirer");

// const db = mysql.createConnection(
//   {
//     host: "localhost",
//     user: "root",
//     password: "3m!ly!$HighM@int3nance!",
//     database: "employeeTracker",
//   },
//   console.log("Connected to the election database.")
// );

function initQuestions() {
  inquirer
    .prompt([
      {
        name: "firstChoice",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add A Department",
          "Add A Role",
          "Add An Employee",
          "Update An Employee Role",
        ],
      },
    ])
    .then((answer) => {
      console.log(answer.firstChoice);
    });
}

initQuestions();
