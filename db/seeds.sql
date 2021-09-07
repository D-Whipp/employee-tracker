
INSERT INTO department (department_name)
VALUES 
    ("Management"),
    ("Sales"),
    ("Legal"),
    ("Engineering"),
    ("Finance");

INSERT INTO roles (role_title, salary, department_id)
VALUES
    ('CEO', 250000, 1),
    ('Manager', 250000, 1),
    ('Salesperson', 85000, 2),
    ('Legal Team Lead', 250000, 3),
    ('Legal Team', 150000, 3),
    ('Chief Engineer', 250000, 4),
    ('Engineer', 85000, 4),
    ('Software Engineer', 85000, 4),
    ('Chieft Accountant', 250000, 5),
    ('Accountant', 85000, 5);

INSERT INTO employees (first_name, last_name, employee_title, department_name, salary, manager)
VALUES 
    ('Ada', 'Lovelace', 1, 1, 1, null),
    ('Anna', 'Franklin', 2, 2, 2, 'Ada Lovelace'),
    ('May', 'Angelo', 3, 2, 3, 'Anna Franklin'),
    ('Allen', 'Eyenstine', 3, 2, 3, 'Anna Franklin'),   
    ('Phillip', 'Greats', 4, 3, 4, 'Ada Lovelace'),
    ('Diane', 'Wales', 5, 3, 5, 'Phillip Greats'),
    ('Gabriel', 'Lincoln', 5, 3, 5, 'Phillip Greats'),
    ('Martin', 'Junior', 6, 4, 6, 'Ada Lovelace'),
    ('Gabe', 'Ruth', 7, 4, 7, 'Martin Junior'),
    ('Edith', 'CoWin', 7, 4, 8, 'Martin Junior'),
    ('Emilia', 'Airheart', 9, 5, 9, 'Ada Lovelace'),
    ('Marie', 'LaRie', 10, 5, 10, 'Emilia Airheart'),
    ('Brandon', 'Johnson', 10, 5, 10, 'Emilia Airheart');
