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
        message: "What is the name of the department?"
    }
];


const addRoleQuestions = [
    {
        name: "newRole",
        type: "input",
        message: "What is the name of the role?"
    },
    {
        name: "salary",
        type: "input",
        message: "What is the salary for this role?"
    },
    {
        name: "newRoleDepartment",
        type: "input",
        message: "Which department will this role be part of?"
    }
];

module.exports = {mainMenuOptions, addDepartmentQuestions, addRoleQuestions};