// Import dotenv
require('dotenv').config();

// Import MySQL2
const mysql = require('mysql2');


const connection = mysql.createConnection(
  {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  },
  console.log(`Connected to the employees_db database.`)
);

module.exports = connection;