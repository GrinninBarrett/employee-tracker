
# 👩‍💼 Employee Tracker

This application is a command-line CMS that uses [MySQL](https://www.npmjs.com/package/mysql2), the [Inquirer package](https://www.npmjs.com/package/inquirer), and the [console.table package](https://www.npmjs.com/package/console.table) to allow users to view and manage the departments, roles, and employees of a company.

---

## Table of Contents
* [Technologies](#technologies)
* [Functionality](#functionality)
* [Challenges](#challenges)
* [Future Development](#future-development)
* [Contact](#contact)
* [License](#license)


## Technologies
* JavaScript
* Node.js
* MySQL
* Inquirer


## Functionality


## Challenges
<!-- TODO: add challenges as they arise -->
* The first hurdle was learning the correct syntax for using `promise()` in a query. This causes the queries to be asynchronous, which is probably preferable here, but being sure all the correct items were included - in the right order - took longer than I expected.
* It took a lot of reading to finally understand more about the `JOIN` types in SQL. I was having trouble getting the `viewAllEmployees` query to show all employees, even if their manager type was `null`, and the easy fix to this was to use an `INNER JOIN` rather than a simple `JOIN`.


## Future Development
<!-- TODO: add ideas for future developement as they arise -->


## Contact
Email me any time with questions, comments, or cat/dog photos! - ctbarrett.tech@gmail.com


## License
&copy; 2021 Charles Tucker Barrett

[MIT License](https://opensource.org/licenses/MIT)