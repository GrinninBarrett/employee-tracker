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
    let managerID;
    let roleID;

    const response = await inquirer.prompt(addEmployeeQuestions)

    const employeeFullName = `${response.firstName} ${response.lastName}`;
    const managerFirstName = response.manager.split(" ")[0];
    const managerLastName = response.manager.split(" ")[1];

    if (response.manager === "None") {
        managerID = null;
    } else {
        db.promise().query(`
            SELECT id
            FROM employees m
            WHERE m.first_name = "${managerFirstName}" AND m.last_name = "${managerLastName}";
        `)
        .then( ([rows]) => {
            managerID = JSON.parse(JSON.stringify(rows[0].id));
            // console.log(managerID);
            return managerID;
        })
        .then( (managerID) => {
            db.promise().query(`
                SELECT id
                FROM roles r
                WHERE r.title = "${response.role}";
            `)
            .then( ([rows]) => {
                roleID = JSON.parse(JSON.stringify(rows[0].id));
                let bothIDs = [roleID, managerID];
                return bothIDs;
            })
            .then((bothIDs) => {
                db.promise().query(`
                    INSERT INTO employees (first_name, last_name, role_id, manager_id)
                    VALUES ("${response.firstName.trim()}", "${response.lastName.trim()}", "${bothIDs[0]}", "${bothIDs[1]}");
                `)
                .catch(err => {
                    if (err) {
                        console.log(err);
                    }
                })
            })
            .then(console.log(chalk.green(`\nSuccessfully added ${employeeFullName} to the database!\n`)))
            .catch(err => {
                if (err) {
                    console.log(err);
                }
            })
        })
    }
}


// TODO: Add function to update employee role
function updateEmployeeRole() {

}

module.exports = {viewAllEmployees, addEmployee, updateEmployeeRole};