INSERT INTO employees (first_name, last_name, title, department, salary, manager)
VALUES 
    ('Ada', 'Lovelace', 'CEO', 'Management', 250000, null),
    ('Anna', 'Franklin', 'Manager', 'Sales', 250000, 'Ada Lovelace'),
    ('May', 'Angelo', 'Salesperson', 'Sales', 85000, 'Anna Franklin'),
    ('Allen', 'Eyenstine', 'Salesperson','Sales', 85000, 'Anna Franklin'),   
    ('Phillip', 'Greats', 'Legal Team Lead', 'Legal', 250000, 'Ada Lovelace'),
    ('Diane', 'Wales', 'Legal Team', 'Legal', 150000, 'Phillip Greats'),
    ('Gabriel', 'Lincoln', 'Legal Team', 'Legal', 150000, 'Phillip Greats'),
    ('Martin', 'Junior', 'Chief Engineer', 'Engineering', 250000, 'Ada Lovelace'),
    ('Gabe', 'Ruth', 'Engineer', 'Engineering', 85000, 'Martin Junior'),
    ('Edith', 'CoWin', 'Software Engineer', 'Engineering', 85000, 'Martin Junior'),
    ('Emilia', 'Airheart', 'Chief Accountant', 'Finance', 250000, 'Ada Lovelace'),
    ('Marie', 'LaRie', 'Accountant', 'Finance', 85000, 'Emilia Airheart'),
    ('Brandon', 'Johnson', 'Accountant', 'Finance', 85000, 'Emilia Airheart');

INSERT INTO roles (title_name, salary)
VALUES
    ('CEO', 250000),
    ('Manager', 250000),
    ('Salesperson', 85000),
    ('Legal Team Lead', 250000),
    ('Legal Team', 150000),
    ('Chief Engineer', 250000),
    ('Engineer', 85000),
    ('Software Engineer', 85000),
    ('Chieft Accountant', 250000),
    ('Accountant', 85000);

INSERT INTO department (department_name)
VALUES 
    ("Management"),
    ("Sales"),
    ("Legal"),
    ("Engineering"),
    ("Finance");