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

module.exports = {mainMenuOptions, addDepartmentQuestions};