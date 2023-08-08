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
    console.log('Connected to the', process.env.DB_NAME, 'database.')
);

function getAllDepartments() {
    const query = 'SELECT d.id, d.name FROM departments d';
    return db.promise().query(query).then(([rows]) => rows);
}

function getAllRoles() {
    const query = 
    `SELECT r.id, r.title, d.name AS department, r.salary
    FROM roles r
    JOIN departments d on r.department_id = d.id`;
    return db.promise().query(query).then(([rows]) => rows);
}

function getAllEmployees() {
    const query = 
    `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
    FROM employees e JOIN roles r ON e.role_id = r.id
    JOIN departments d ON r.department_id = d.id
    LEFT JOIN employees m ON e.manager_id = m.id`;
    return db.promise().query(query).then(([rows]) => rows);
}

function endConnection() {
    console.log('Quitting the Company Database.');
    db.end();
}

module.exports = {
    getAllDepartments,
    getAllRoles,
    getAllEmployees,
    endConnection
};
