const db = require('../config/connection');


// Questions for user input
const mainMenuOptions = [
    {
        name: "choice",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View all departments",
            "View all roles",
            "View all managers",
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


// Function to return an array of all managers
// Put here because the circular dependency was causing errors
function getAllManagers() {
    let managerArray = [];
    return db.promise().query(`
        SELECT CONCAT(m.first_name, ' ' ,m.last_name) AS manager
        FROM employees m
        WHERE m.manager_id IS null
        `)
    .then( ([rows]) => {
        let allManagers = JSON.parse(JSON.stringify(rows));
        allManagers.forEach(manager => {
            managerArray.push(manager.manager);
        });
        return managerArray;
    })
    .then((managerArray) => {
        return managerArray;
    })
    .catch(err => {
        if (err) {
            console.log(err);
        }
    })
}



module.exports = {
    mainMenuOptions,
    addDepartmentQuestions,
    addRoleQuestions,
    addEmployeeQuestions
};