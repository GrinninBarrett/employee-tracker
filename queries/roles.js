const db = require('../config/connection');


function viewAllRoles() {
    return db.promise().query("SELECT * FROM roles")
    .then( ([rows]) => {
      console.log("\n");
      console.table(rows);
    })
    .catch(err => {
        console.log(err);
    })
}

module.exports = viewAllRoles;