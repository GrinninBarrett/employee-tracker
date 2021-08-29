
# 👩‍💼 Employee Tracker

This application is a command-line CMS that uses [MySQL](https://www.npmjs.com/package/mysql2), Node.js, the [Inquirer package](https://www.npmjs.com/package/inquirer), and the [console.table package](https://www.npmjs.com/package/console.table) to allow users to view and manage the departments, roles, and employees of a company.

---

## Table of Contents
* [Technologies](#technologies)
* [Functionality](#functionality)
* [Challenges](#challenges)
* [Future Development](#future-development)
* [Contact](#contact)
* [License](#license)


## Technologies
* MySQL
* Node.js
* Inquirer
* JavaScript


## Functionality
[App Demonstration Video]()

#### App Initialization
* Be sure to first run <code>npm i</code> after cloning this repo or copying its code into your own files.
* This code uses a `.env` file, which is configured in `connection.js` through the [dotenv](https://www.npmjs.com/package/dotenv) package. If you clone this repo or copy its code, you will need to adjust the variables in `connection.js`, or otherwise create your own `.env` file.
* Once the appropriate node modules have been installed and you have set up your `connection.js` with or without a `.env` file, run `node index.js` to initialize the app:

![App Initialization](./assets/images/app-initialization.gif)


## Challenges
* The first hurdle was learning the correct syntax for using `promise()` in a query. This causes the queries to be asynchronous, which is probably preferable here, but being sure all the correct items were included - in the right order - took longer than I expected.
* It took a lot of reading to finally understand more about the `JOIN` types in SQL. I was having trouble getting the `viewAllEmployees` query to show all employees, even if their manager type was `null`, and the easy fix to this was to use a `LEFT JOIN` rather than a simple `JOIN`.
* I knew I needed to get a list of all managers (in case a new one had been added) by selecting them from the employees table, in order to use that array as the list of choices in the inquirer prompt while adding a new employee. However, because of how I was trying to keep the code modular and organized, it resulted in a circular dependency that was causing errors. I ultimately decided to move the functions that query the database to get all the departments/roles/managers/employees into their own `helpers.js` file to prevent circular dependencies.


## Future Development
* I would like to add the ability to do the following:
    * Update employee managers
    * View employees by manager
    * View employees by department
    * Delete departments, roles, and employees
    * View the total utilized budget of a department (total of all salaries)
* Also, in a general sense, I'd like to update the code where possible to improve efficiency and organization. I think I have gotten the app to work as intended, but I'm not 100% certain if the way I have done it is the best or most efficient way. I want to be sure my code follows best practices, so I plan to update this code as I learn more about them.


## Contact
Email me any time with questions, comments, or cat/dog photos! - ctbarrett.tech@gmail.com


## License
&copy; 2021 Charles Tucker Barrett

[MIT License](https://opensource.org/licenses/MIT)