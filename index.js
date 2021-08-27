// Import packages
const inquirer = require('inquirer');
const cTable = require('console.table');
const chalk = require('chalk');
const figlet = require('figlet');

// Import db connection
const db = require('./config/connection');

// Import questions for user
const questions = require('./questions/questions');


db.connect((err) => {
    if (err) throw error;
    introLog();
    mainMenu();
})


function mainMenu() {
    let results = inquirer.prompt(questions)
        
        .then((response) => {
            const { choices } = response;
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