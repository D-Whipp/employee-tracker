DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS department;


CREATE TABLE department (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30)
);

CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    role_title VARCHAR(30),
    salary INTEGER,
    department_id INTEGER,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employees (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    employee_title INTEGER,
    department_name INTEGER,
    salary INTEGER,
    manager VARCHAR(30),
    FOREIGN KEY (employee_title) REFERENCES roles(id),
    FOREIGN KEY (department_name) REFERENCES department(id),
    FOREIGN KEY (salary) REFERENCES roles(id)
);