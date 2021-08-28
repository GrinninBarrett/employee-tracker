const db = require('../config/connection');

const {viewAllDepartments, addDepartment} = require('./departments');
const {viewAllRoles, addRole} = require('./roles');
const {viewAllEmployees, addEmployee} = require('./employees');


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
    quit
};