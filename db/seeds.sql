-- Department seeds
INSERT INTO departments (department_name)
VALUES ("Engineering"),
       ("Marketing"),
       ("Sales"),
       ("Legal"),
       ("Finance");


-- Roles seeds
INSERT INTO roles (title, salary, department_id)
VALUES  ("Engineering Manager", 175000, 1),
        ("Marketing Manager", 185000, 2),
        ("Sales Manager", 165000, 3),
        ("Legal Lead", 190000, 4),
        ("Finance Director", 155000, 5),
        ("Senior Engineer", 145000, 1),
        ("Junior Engineer", 80000, 1),
        ("Marketing Associate", 75000, 2),
        ("Salesperson", 85000, 3),
        ("Lawyer", 160000, 4),
        ("Accountant", 65000, 5);



-- Employees seeds
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ("Gandalf", "Greybeard", 1, null),
        ("Bilbo", "Baggins", 2, null),
        ("Legolas", "Archer", 3, null),
        ("Aragorn", "Elessar", 4, null),
        ("Theoden", "King", 5, null),
        ("Gimli", "Axebearer", 6, 1),
        ("Frodo", "Baggins", 7, 1),
        ("Meriadoc", "Brandybuck", 8, 2),
        ("Peregrin", "Took", 9, 3),
        ("Samwise", "Gamgee", 10, 4),
        ("Eowyn", "Shieldmaiden", 11, 5);
