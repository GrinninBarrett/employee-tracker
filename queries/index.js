const db = require('../config/connection');

// Import all functions from queries folder
const {viewAllDepartments, addDepartment} = require('./departments');
const {viewAllRoles, addRole} = require('./roles');
const {viewAllEmployees, addEmployee, updateEmployeeRole} = require('./employees');


// Stops the server connection
function quit() {
    return db.end();
}

module.exports = {
    viewAllDepartments,
    addDepartment,
    viewAllRoles,
    addRole,
    viewAllEmployees,
    addEmployee,
    updateEmployeeRole,
    quit
};