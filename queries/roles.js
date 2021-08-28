const db = require('../config/connection');
const inquirer = require('inquirer');
const {addRoleQuestions} = require('../questions/questions');


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


async function addRole() {
    let newRoleID;
    const response = await inquirer.prompt(addRoleQuestions)
    db.promise().query(`
        SELECT *
        FROM departments d
        WHERE d.department_name = "${response.newRoleDepartment}";`)
        .then(([rows]) => {
            // Parse the response from the query to get just the id of the department the new role will go into
            newRoleID = JSON.parse(JSON.stringify(rows))[0].id
            return newRoleID;
        })
        .then(newRoleID => {
            db.query(`
            INSERT INTO roles (title, salary, department_id) 
            VALUES ("${response.newRole}", "${response.salary}", "${newRoleID}")`,
            (err) => {
                if (err) {
                    console.log(err);
                }
            })
        })
        .then(console.log(`\nSuccessfully added the ${response.newRole} role!\n`))
        .catch(err => {
            if (err) {
                console.log(err);
            }
        })
}

module.exports = {viewAllRoles, addRole};