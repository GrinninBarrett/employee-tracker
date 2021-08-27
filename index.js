// Import packages
const inquirer = require('inquirer');
const cTable = require('console.table');
const chalk = require('chalk');
const figlet = require('figlet');

// Import db connection
const db = require('./config/connection');

// Import questions for user
const questions = require('./questions/questions');


// Upon start, log "Employee Tracker" and prompt for user input
db.connect((err) => {
    if (err) throw error;
    introLog();
    mainMenu();
})


// Menu to prompt for user input
function mainMenu() {
    inquirer.prompt(questions)
        
        .then((response) => {

            switch (response.choice) {
                case "View all departments":
                    viewAllDepartments();
                    break;

                case "View all roles":
                    viewAllRoles();
                    break;

                case "View all employees":
                    viewAllEmployees();
                    break;

                case "Quit":
                    quit();
                    break;
            }


        })

        .catch((err) => {
            console.error(err);
        })

}


function viewAllDepartments() {
    db.promise().query("SELECT * FROM departments")
    .then( ([rows]) => {
      console.log("\n");
      console.table(rows);
    })
    .catch(console.log("Something went wrong"))
    .then( () => mainMenu());
}

function viewAllRoles() {
    db.promise().query("SELECT * FROM roles")
    .then( ([rows]) => {
      console.log("\n");
      console.table(rows);
    })
    .catch(console.log("Something went wrong"))
    .then( () => mainMenu());
}

function viewAllEmployees() {
    db.promise().query(`
        SELECT id, first_name, last_name, role_id 
        FROM employees
        `)
    .then( ([rows]) => {
      console.log("\n");
      console.table(rows);
    })
    .catch(console.log("Something went wrong"))
    .then( () => mainMenu());
}

function quit() {
    db.end();
}


function introLog() {
    console.log(chalk.cyan(`=========================================================================================`));
    console.log(chalk.cyan(figlet.textSync(`Employee Tracker`, {font: "slant"})));
    console.log(chalk.cyan(`=========================================================================================`));
}


