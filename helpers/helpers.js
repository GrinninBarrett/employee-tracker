const db = require('../config/connection');

// TODO: Create this function
// Returns an array of all departments, to be used as the choices parameter in inquirer prompt
function getAllDepartments() {

}

// TODO: Create this function
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
// TODO: Add "none" as the first item in the managerArray
function getAllManagers() {
    let managersArray = [];
    return db.promise().query(`
        SELECT CONCAT(m.first_name, ' ' ,m.last_name) AS manager
        FROM employees m
        WHERE m.manager_id IS null;
        `)
    .then( ([rows]) => {
        let allManagers = JSON.parse(JSON.stringify(rows));
        allManagers.forEach(manager => {
            managersArray.push(manager.manager);
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



module.exports = {getAllDepartments, getAllRoles, getAllManagers}