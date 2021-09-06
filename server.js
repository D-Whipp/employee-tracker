const mysql = require("mysql2");
const cTable = require("console.table");
const inquirer = require("inquirer");

// Display App Title
console.log("Welcome to Employee Tracker!");

initQuestions();
// create the connection to the database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "3m!ly!$HighM@int3nance!",
    database: "employeeTracker",
  },
  console.log("Connected to the employeeTracker database.")
);

console.log("Welcome to Employee Tracker!");

async function initQuestions() {
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
      if (answer.firstChoice === "View All Departments") {
        // console.log("You chose: View All Departments", answer.firstChoice);
        // const sql = "SELECT * FROM employees;";
        // console.table(mysql);

        // Displays the employes table
        db.query("SELECT * FROM employees", (err, rows) => {
          if (err) {
            console.log("error: ", err.message);
            return;
          } else {
            console.table(rows);
            // places call to initQuestions so the user can select their next action
            initQuestions();
          }
        });
      } else if (answer.firstChoice === "View All Roles") {
        // console.log("You chose: View All Roles!", answer.firstChoice);
        db.query("SELECT * FROM roles", (err, rows) => {
          if (err) {
            console.log("error: ", err.message);
            return;
          } else {
            console.table(rows);
            initQuestions();
          }
        });
      } else if (answer.firstChoice === "View All Employees") {
        console.log("You chose: View All Employees", answer.firstChoice);

        db.query("SELECT first_name, last_name FROM employees", (err, rows) => {
          if (err) {
            console.log("error: ", err.message);
            return;
          } else {
            console.table(rows);
            initQuestions();
          }
        });
      } else if (answer.firstChoice === "Add A Department") {
        console.log("You chose Add A Department!", answer.firstChoice);
      } else if (answer.firstChoice === "Add A Role") {
        console.log("You chose Add A Role: ", answer.firstChoice);
      } else if (answer.firstChoice === "Add An Employee") {
        console.log("You chose Add An Employee: ", answer.firstChoice);
      } else if (answer.firstChoice === "Update An Employee Role") {
        console.log("You chose Update An Employee Role: ", answer.firstChoice);
      }
    });
}
