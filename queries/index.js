const db = require('../config/connection');

const viewAllDepartments = require('./departments');
const viewAllRoles = require('./roles');
const viewAllEmployees = require('./employees');


function quit() {
    return db.end();
}

module.exports = {viewAllDepartments, viewAllRoles, viewAllEmployees, quit};