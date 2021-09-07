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
                  // using this code block to display the table with it's changes
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
        // This was a template for db.query I found when reading the documentation
        // All of my db.query's were build upon this one
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

        inquirer
          .prompt([
            {
              type: "input",
              name: "roleName",
              message: "Enter the Role you'd like to add: (Required)",
              validate: (answer) => {
                if (answer) {
                  return true;
                } else {
                  console.log("Enter the Role you'd like to add: (Required)");
                  return false;
                }
              },
            },
            {
              name: "salaryOption",
              type: "list",
              message: "How much should the new role be paid?: ",
              choices: [250000, 150000, 85000],
            },
            {
              name: "roleOption",
              type: "list",
              message:
                "Select the Role's Department: 1: Management, 2: Sales, 3: Legal, 4: Engineering, 5: Finance, 6: Other",
              choices: [1, 2, 3, 4, 5, 6],
            },
          ])
          .then(function (data) {
            console.log(data);
            db.query(
              `INSERT INTO roles (title, salary, department_id) VALUES(?, ?, ?)`,
              [data.roleName, data.salaryOption, data.roleOption],
              (err, rows) => {
                if (err) {
                  console.log("error: ", err.message);
                  return;
                } else {
                  console.table(rows);

                  //  Using this block of code to view the table with it's changes
                  db.query("SELECT * FROM roles", (err, rows) => {
                    if (err) {
                      console.log("error: ", err.message);
                      return;
                    } else {
                      console.table(rows);
                      // I use this to allow the user to select more options with the app
                      initQuestions();
                    }
                  });
                }
              }
            );
          });
      } else if (answer.firstChoice === "Add An Employee") {
        console.log("You chose Add An Employee: ", answer.firstChoice);

        inquirer
          .prompt([
            {
              name: "employeeFirstName",
              type: "input",
              message: "Enter Employee's First Name: (Required)",
              validate: (answer) => {
                if (answer) {
                  return true;
                } else {
                  console.log("Enter Employee's First Name: (Required)");
                  return false;
                }
              },
            },
            {
              name: "employeeLastName",
              type: "input",
              message: "Enter Employee's Last Name: (Required)",
              validate: (answer) => {
                if (answer) {
                  return true;
                } else {
                  console.log("Enter Employee's Last Name: (Required)");
                  return false;
                }
              },
            },
            {
              name: "employeeRole",
              type: "list",
              message: "Select Employee's Role: ",
              choices: [
                "Manager",
                "Salesperson",
                "Legal Team Lead",
                "Legal Team",
                "Chief Engineer",
                "Engineer",
                "Software Engineer",
                "Chief Accountant",
                "Accountant",
              ],
            },
            {
              name: "employeeManager",
              type: "list",
              message: "Who is this Employee's Manager: ",
              choices: [
                "Ada Lovelace",
                "Anna Franklin",
                "Phillip Greats",
                "Martin Junior",
                "Emilia Airheart",
              ],
            },
          ])
          .then(function (data) {
            console.log(data);

            db.query(
              `
            INSERT INTO employees (first_name, last_name, manager) VALUES (?, ?, ?)
            `,
              [
                data.employeeFirstName,
                data.employeeLastName,
                data.employeeManager,
              ],
              (err, rows) => {
                if (err) {
                  console.log("error: ", err.message);
                  return;
                } else {
                  console.table(rows);

                  //  Using this block of code to view the table with it's changes
                  db.query("SELECT * FROM employees", (err, rows) => {
                    if (err) {
                      console.log("error: ", err.message);
                      return;
                    } else {
                      console.table(rows);
                      // I use this to allow the user to select more options with the app
                      initQuestions();
                    }
                  });
                }
              }
            );
            db.query(
              `INSERT INTO roles (title) VALUES (?)`,
              data.employeeRole,
              (err, rows) => {
                if (err) {
                  console.log("error: ", err.message);
                  return;
                } else {
                  console.log("success");
                  console.table(rows);
                }
              }
            );
          });
      } else if (answer.firstChoice === "Update An Employee Role") {
        console.log("You chose Update An Employee Role: ", answer.firstChoice);
      }
    });
}
