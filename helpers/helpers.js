const db = require('../config/connection');

// Returns an array of all departments, to be used as the choices parameter in inquirer prompt
function getAllDepartments() {
    let departmentsArray = [];
    return db.promise().query(`
        SELECT department_name
        FROM departments;
        `)
    .then( ([rows]) => {
        let allDepartments = JSON.parse(JSON.stringify(rows));
        allDepartments.forEach(department => {
            departmentsArray.push(department.department_name);
        })
        return departmentsArray;
    })
    .then(departmentsArray => {
        return departmentsArray;
    })
    .catch(err => {
        if (err) {
            console.log(err);
        }
    })
}


// Returns an array of all Roles, to be used as the choices parameter in inquirer prompt
function getAllRoles() {
    let rolesArray = [];
    return db.promise().query(`
        SELECT title
        FROM roles;
        `)
    .then( ([rows]) => {
        let allRoles = JSON.parse(JSON.stringify(rows));
        allRoles.forEach(role => {
            rolesArray.push(role.title);
        })
        return rolesArray;
    })
    .then(rolesArray => {
        return rolesArray;
    })
    .catch(err => {
        if (err) {
            console.log(err);
        }
    })
}


// Returns an array of all managers, to be used as the choices parameter in inquirer prompt
function getAllManagers() {
    let managersArray = ["None"];
    return db.promise().query(`
        SELECT id, CONCAT(m.first_name, ' ' ,m.last_name) AS name
        FROM employees m
        WHERE m.manager_id IS null;
        `)
    .then( ([rows]) => {
        let allManagers = JSON.parse(JSON.stringify(rows));
        allManagers.forEach(manager => {
            managersArray.push(manager.name);
        });
        return managersArray;
    })
    .then(managersArray => {
        return managersArray;
    })
    .catch(err => {
        if (err) {
            console.log(err);
        }
    })
}


// Returns an array of all employees, to be used as a choices parameter in inquirer prompt
function getAllEmployees() {
    let employeesArray = [];

    return db.promise().query(`
        SELECT CONCAT(e.first_name, ' ', e.last_name) AS name
        FROM employees e
    `)
    .then(([rows]) => {
        let allEmployees = JSON.parse(JSON.stringify(rows));
        allEmployees.forEach(employee => {
            employeesArray.push(employee.name);
        });
        return employeesArray;
    })
    .catch(err => {
        if (err) {
            console.log(err);
        }
    })
}



module.exports = {
    getAllDepartments,
    getAllRoles,
    getAllManagers,
    getAllEmployees
}