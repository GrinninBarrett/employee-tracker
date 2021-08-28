const db = require('../config/connection');

// TODO: Create this function
// Returns an array of all departments, to be used as the choices parameter in inquirer prompt
function getAllDepartments() {

}

// TODO: Create this function
// Returns an array of all Roles, to be used as the choices parameter in inquirer prompt
function getAllRoles() {

}


// Returns an array of all managers, to be used as the choices parameter in inquirer prompt
// TODO: Add "none" as the first item in the managerArray
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



module.exports = {getAllDepartments, getAllRoles, getAllManagers}