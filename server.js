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
          "View Employee Table",
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
      // If the user chooses to view the employee table
      if (answer.firstChoice === "View Employee Table") {
        // Then get everything from the employee table
        db.query("SELECT * FROM employees", (err, rows) => {
          if (err) {
            // first check for an error
            // if there's an error tell me what it is
            console.log("error: ", err.message);
            return;
          } else {
            // and display it
            console.table(rows);
            // places call to initQuestions so the user can select their next action
            initQuestions();
          }
        });
      } else if (answer.firstChoice === "View All Departments") {
        db.query("SELECT id, department_name FROM department", (err, rows) => {
          if (err) {
            console.log("error: ", err.message);
            return;
          } else {
            console.table(rows);
            initQuestions();
          }
        });
      } else if (answer.firstChoice === "View All Roles") {
        // console.log("You chose: View All Roles!", answer.firstChoice);
        db.query(
          `SELECT roles.*, department.department_name
          AS departement_name 
          FROM roles
          LEFT JOIN department
          ON roles.title_name = department.id
          WHERE roles.id=?`,
          1,
          (err, rows) => {
            if (err) {
              console.log("error: ", err.message);
              return;
            } else {
              console.table(rows);
              initQuestions();
            }
          }
        );
      } else if (answer.firstChoice === "View All Employees") {
        // console.log("You chose: View All Employees", answer.firstChoice);

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

        inquirer
          .prompt([
            {
              type: "input",
              name: "departmentName",
              message: "Enter the Department you'd like to add: (Required)",
              validate: (answer) => {
                if (answer) {
                  return true;
                } else {
                  console.log(
                    "Enter the Department you'd like to add: (Required)"
                  );
                  return false;
                }
              },
            },
          ])
          .then(function (data) {
            console.log(data);
            db.query(
              `INSERT INTO department (department_name) VALUES(?)`,
              data.departmentName,
              (err, rows) => {
                if (err) {
                  console.log("error: ", err.message);
                  return;
                } else {
                  db.query("SELECT * FROM department", (err, rows) => {
                    if (err) {
                      console.log("error: ", err.message);
                      return;
                    } else {
                      console.table(rows);
                      initQuestions();
                    }
                  });
                  // console.table(rows);
                  initQuestions();
                }
              }
            );
          });

        // db.query(
        //   "INSERT INTO department (department_name) VALUES (?)",
        //   (err, rows) => {
        //     if (err) {
        //       console.log("error: ", err.message);
        //       return;
        //     } else {
        //       console.table(rows);
        //       initQuestions();
        //     }
        //   }
        // );
      } else if (answer.firstChoice === "Add A Role") {
        console.log("You chose Add A Role: ", answer.firstChoice);
      } else if (answer.firstChoice === "Add An Employee") {
        console.log("You chose Add An Employee: ", answer.firstChoice);
      } else if (answer.firstChoice === "Update An Employee Role") {
        console.log("You chose Update An Employee Role: ", answer.firstChoice);
      }
    });
}
