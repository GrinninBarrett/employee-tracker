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
            }


        })

        .catch((err) => {
            console.error(err);
        })

}


function introLog() {
    console.log(chalk.cyan(`=========================================================================================`));
    console.log(chalk.cyan(figlet.textSync(`Employee Tracker`, {font: "slant"})));
    console.log(chalk.cyan(`=========================================================================================`));
}

function viewAllDepartments() {
    db.promise().query("SELECT * FROM departments")
    .then( ([rows]) => {
      console.log("\n");
      console.table(rows);
    })
    .catch(console.log)
    .then( () => mainMenu());
}


