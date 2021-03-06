const db = require('../config/connection');
const inquirer = require('inquirer');
const chalk = require('chalk');
const {addRoleQuestions} = require('../questions/questions');


// Shows all roles
function viewAllRoles() {
    return db.promise().query("SELECT * FROM roles;")
    .then( ([rows]) => {
      console.log("\n");
      console.table(rows);
    })
    .catch(err => {
        console.log(err);
    })
}


// Adds a new role
async function addRole() {
    let newRoleDepartmentID;
    const response = await inquirer.prompt(addRoleQuestions)

    db.promise().query(`
        SELECT *
        FROM departments d
        WHERE d.department_name = "${response.newRoleDepartment}";`)
        .then(([rows]) => {
            // Parse the response from the query to get just the id of the department the new role will go into
            newRoleDepartmentID = JSON.parse(JSON.stringify(rows))[0].id
            return newRoleDepartmentID;
        })
        .then(newRoleDepartmentID => {
            db.query(`
            INSERT INTO roles (title, salary, department_id) 
            VALUES ("${response.newRole}", "${response.salary}", "${newRoleDepartmentID}");`,
            (err) => {
                if (err) {
                    console.log(err);
                }
            })
        })
        .then(console.log(chalk.green(`\nSuccessfully added the ${response.newRole} role!\n`)))
        .catch(err => {
            if (err) {
                console.log(err);
            }
        })
}


module.exports = {viewAllRoles, addRole};