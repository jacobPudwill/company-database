-- View All Employees
SELECT
    e.id,
    e.first_name,
    e.last_name,
    r.title,
    d.name AS department,
    r.salary,
    CONCAT(m.first_name, ' ', m.last_name) AS manager
FROM
    employees e
JOIN
    roles r ON e.role_id = r.id
JOIN
    departments d ON r.department_id = d.id
LEFT JOIN
    employees m ON e.manager_id = m.id;

-- View All Roles
SELECT
    r.id,
    r.title,
    d.name AS department,
    r.salary
FROM
    roles r
JOIN
    departments d on r.department_id = d.id;

-- View All Departments
SELECT
    d.id,
    d.name
FROM
    departments d;
