const db = require('../config/connection');


function viewAllDepartments() {
    return db.promise().query("SELECT * FROM departments")
    .then( ([rows]) => {
      console.log("\n");
      console.table(rows);
    })
    .catch(err => {
        console.log(err);
    })
}

module.exports = viewAllDepartments;