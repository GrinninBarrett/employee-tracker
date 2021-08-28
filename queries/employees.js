const db = require('../config/connection');


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

module.exports = viewAllEmployees;