const db = require('../config/connection');

// Import chalk to make validation fail messages stand out
const chalk = require('chalk');

const {
    getAllDepartments,
    getAllRoles,
    getAllManagers
} = require('../helpers/helpers');


// Questions for user input
const mainMenuOptions = [
    {
        name: "choice",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Update an employee's role",
            "Quit"
        ]
    }
];

const addDepartmentQuestions = [
    {
        name: "department",
        type: "input",
        message: "What is the name of the department?",
        validate: departmentInput => {
            if (departmentInput.trim().length === 0) {
                console.log(chalk.red(`\n\nPlease enter a department name of at least one character.\n`));
                return false;
            } 
            return true;
        }
    }
];


const addRoleQuestions = [
    {
        name: "newRole",
        type: "input",
        message: "What is the name of the role?",
        validate: roleInput => {
            if (roleInput.trim().length === 0) {
                console.log(chalk.red(`\n\nPlease enter a role name of at least one character.\n`));
                return false;
            } 
            return true;
        }
    },
    {
        name: "salary",
        type: "input",
        message: "What is the salary for this role?",
        validate: salaryInput => {
            if ((isNaN(salaryInput)) || salaryInput.trim().length === 0) {
                console.log(chalk.red(`\n\nPlease enter at least a one-digit number for the salary.\n`));
                return false;
            } 
            return true;
        }
    },
    {
        //TODO: Change to list type using getAllDepartments as helper for choices
        name: "newRoleDepartment",
        type: "input",
        message: "Which department does this role belong to?"
    }
];


const addEmployeeQuestions = [
    {
        name: "firstName",
        type: "input",
        message: "What is the employee's first name?"
    },
    {
        name: "lastName",
        type: "input",
        message: "What is the employee's last name?"
    },
    {
        // TODO: Change to list type with getAllRoles helper for choices
        name: "role",
        type: "input",
        message: "What is the employee's role?"
    },
    {
        name: "manager",
        type: "list",
        message: "Who is the employee's manager?",
        choices: getAllManagers
    }
]



module.exports = {
    mainMenuOptions,
    addDepartmentQuestions,
    addRoleQuestions,
    addEmployeeQuestions
};