const db = require('../config/connection');
const inquirer = require('inquirer');
const chalk = require('chalk');
const { addEmployeeQuestions, updateEmployeeQuestions } = require('../questions/questions');


// Shows all employees
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


// Adds a new employee
async function addEmployee() {
    let managerID;
    let roleID;

    const response = await inquirer.prompt(addEmployeeQuestions)

    const employeeFullName = `${response.firstName} ${response.lastName}`;
    const managerFirstName = response.manager.split(" ")[0];
    const managerLastName = response.manager.split(" ")[1];

    // Execute if the new employee has no manager (is a manager themselves)
    if (response.manager === "None") {
        return db.promise().query(`
                SELECT id
                FROM roles r
                WHERE r.title = "${response.role}";
            `)
        .then( ([rows]) => {
            roleID = JSON.parse(JSON.stringify(rows[0].id));
            return roleID;
        })
        .then((roleID) => {
            db.promise().query(`
                INSERT INTO employees (first_name, last_name, role_id, manager_id)
                VALUES ("${response.firstName.trim()}", "${response.lastName.trim()}", "${roleID}", null);
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
    }

    // Execute if the new employee has a manager
    return db.promise().query(`
        SELECT id
        FROM employees m
        WHERE m.first_name = "${managerFirstName}" AND m.last_name = "${managerLastName}";
    `)
    .then( ([rows]) => {
        managerID = JSON.parse(JSON.stringify(rows[0].id));
        // console.log(managerID);
        return managerID;
    })
    .then( managerID => {
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
        .then( bothIDs => {
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


// Updates an employee's role
async function updateEmployeeRole() {
    let employeeID;
    let roleID;
    const response = await inquirer.prompt(updateEmployeeQuestions);

    console.log(response);

    const employeeFirstName = response.employee.split(" ")[0];
    const employeeLastName = response.employee.split(" ")[1];
    const employeeFullName = response.employee;

    return db.promise().query(`
        SELECT id
        FROM employees e
        WHERE e.first_name = "${employeeFirstName}" AND e.last_name = "${employeeLastName}";
    `)
    .then( ([rows]) => {
        employeeID = JSON.parse(JSON.stringify(rows[0].id));
        return employeeID;
    })
    .then( employeeID => {
        db.promise().query(`
            SELECT id
            FROM roles r
            WHERE r.title = "${response.role}";
        `)
        .then( ([rows]) => {
            roleID = JSON.parse(JSON.stringify(rows[0].id));
            let bothIDs = [employeeID, roleID];
            return bothIDs;
        })
        .then( bothIDs => {
            db.promise().query(`
                UPDATE employees
                SET role_id = "${bothIDs[1]}"
                WHERE id = "${bothIDs[0]}";
            `)
            .catch(err => {
                if (err) {
                    console.log(err);
                }
            })
        })
    })
    .then(console.log(chalk.green(`\nSuccessfully updated ${employeeFullName}'s role!\n`)))
    .catch(err => {
        if (err) {
            console.log(err);
        }
    })
}

module.exports = {viewAllEmployees, addEmployee, updateEmployeeRole};