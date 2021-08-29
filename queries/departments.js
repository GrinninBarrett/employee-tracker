const db = require('../config/connection');
const inquirer = require('inquirer');
const {addDepartmentQuestions} = require('../questions/questions');


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


// Add validations to be sure user actually enters some text
async function addDepartment() {
  const response = await inquirer.prompt(addDepartmentQuestions)
  db.query(`INSERT INTO departments (department_name) VALUES ("${response.department}");`,
    (err) => {
      if (err) {
        console.log(err);
      }
    })
  console.log(`\nSuccessfully added the ${response.department} department!\n`);
}


module.exports = {viewAllDepartments, addDepartment};