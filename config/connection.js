const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createPool(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    },
    console.log(`Connected to the ${process.env.DB_NAME} database.`)
);

function getAllDepartments() {
    const query = 'SELECT d.id, d.name FROM departments d';
    return db.promise().query(query).then(([rows]) => rows);
}

function addDepartment(name) {
    const query = 'INSERT INTO departments (name) VALUES (?)';
    return db.promise().query(query, [name]);
}

function getAllRoles() {
    const query = 
    `SELECT r.id, r.title, d.name AS department, r.salary
    FROM roles r
    JOIN departments d on r.department_id = d.id`;
    return db.promise().query(query).then(([rows]) => rows);
}

function addRole(title, salary, department_id) {
    const query = 'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)';
    return db.promise().query(query, [title, salary, department_id]);
}

function getAllEmployees() {
    const query = 
    `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employees e JOIN roles r ON e.role_id = r.id
    JOIN departments d ON r.department_id = d.id
    LEFT JOIN employees m ON e.manager_id = m.id`;
    return db.promise().query(query).then(([rows]) => rows);
}

function addEmployee(first_name, last_name, role_id, manager_id) {
    const query = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
    return db.promise().query(query, [first_name, last_name, role_id, manager_id]);
}

function endConnection() {
    console.log('Quitting the Company Database.');
    db.end();
}

module.exports = {
    getAllDepartments,
    addDepartment,
    getAllRoles,
    addRole,
    getAllEmployees,
    addEmployee,
    endConnection
};
