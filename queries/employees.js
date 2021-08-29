const db = require('../config/connection');
const inquirer = require('inquirer');
const chalk = require('chalk');
const { addEmployeeQuestions } = require('../questions/questions');



function viewAllEmployees() {
    return db.promise().query(`
        SELECT 
            e.id, e.first_name, e.last_name, 
            r.title, r.salary,
            d.department_name AS department,
            CONCAT(m.first_name, ' ' ,m.last_name) AS reports_to
        FROM employees e
        JOIN roles r ON e.role_id = r.id
        JOIN departments d ON r.department_id = d.id
        LEFT JOIN employees m ON e.manager_id = m.id
        ORDER BY id
        `)
    .then( ([rows]) => {
      console.log("\n");
      console.table(rows);
    })
    .catch(err => {
        console.log(err);
    })
}


async function addEmployee() {
    const response = await inquirer.prompt(addEmployeeQuestions)
    console.log(response);

    // TODO: When inserting, check for whether the user chose "none", in which case, set manger_id to null

    // db.promise().query(`
    //     SELECT * FROM roles
    // `)
    // .then(([rows]) => {
    //     let allRoles = JSON.parse(JSON.stringify(rows));
    //     allRoles.filter(role => {
    //         role.title === response.role;
    //     });
    //     console.log(allRoles);
    // })
}


// TODO: Add function to update employee role

module.exports = {viewAllEmployees, addEmployee};