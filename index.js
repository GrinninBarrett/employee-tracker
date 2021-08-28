// Import packages
const inquirer = require('inquirer');
const cTable = require('console.table');
const chalk = require('chalk');
const figlet = require('figlet');

// Import db connection
const db = require('./config/connection');

// Import questions for user
const questions = require('./questions/questions');

const { viewAllDepartments, viewAllRoles, viewAllEmployees, quit } = require('./queries/index');


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
                    viewAllDepartments().then(() => mainMenu());
                    break;

                case "View all roles":
                    viewAllRoles().then(() => mainMenu());
                    break;

                case "View all employees":
                    viewAllEmployees().then(() => mainMenu());
                    break;

                case "Add a department":
                    addDepartment();
                    break;

                case "Add a role":
                    addRole();
                    break;

                case "Add an employee":
                    addEmployee();
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





// Show formatted "Employee Tracker" using Figlet
function introLog() {
    console.log(chalk.cyan(`=========================================================================================`));
    console.log(chalk.cyan(figlet.textSync(`Employee Tracker`, {font: "slant"})));
    console.log(chalk.cyan(`=========================================================================================`));
}


