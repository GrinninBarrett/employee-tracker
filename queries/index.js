const db = require('../config/connection');

const {viewAllDepartments, addDepartment} = require('./departments');
const {viewAllRoles, addRole} = require('./roles');
const viewAllEmployees = require('./employees');


function quit() {
    return db.end();
}

module.exports = {viewAllDepartments, addDepartment, viewAllRoles, addRole, viewAllEmployees, quit};