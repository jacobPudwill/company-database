const inquirer = require('inquirer');
const { 
    getAllDepartments,
    addDepartment,
    getAllRoles,
    addRole,
    getAllEmployees,
    addEmployee,
    updateEmployeeRole,
    endConnection
} = require('./config/connection');

function startApp() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'Add Employee',
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Department',
                'Quit'
            ]
        }
    ])
    .then(async (response) => {
        const roles = await getAllRoles();
        const employees = await getAllEmployees();

        const roleChoices = roles.map((role) => role.title);
        const employeeChoices = employees.map((employee) => `${employee.first_name} ${employee.last_name}`);

        switch (response.choice) {
            case 'View All Employees':
                console.table(employees);
                startApp();
                break;
            case 'Add Employee':                
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'first_name',
                        message: `What is the employee's first name?`
                    },
                    {
                        type: 'input',
                        name: 'last_name',
                        message: `What is the employee's last name?`
                    },
                    {
                        type: 'list',
                        name: 'role',
                        message: `What is the employee's role?`,
                        choices: roleChoices
                    },
                    {
                        type: 'list',
                        name: 'manager',
                        message: `Who is the employee's manager?`,
                        choices: employeeChoices
                    }
                ])
                .then((response) => {
                    const role = roles.filter(role => role.title === response.role)[0];
                    const manager = employees.filter(employee => `${employee.first_name} ${employee.last_name}` === response.manager)[0];

                    addEmployee(response.first_name, response.last_name, role.id, manager.id)
                        .then(() => {
                            console.log(`Added ${response.first_name} ${response.last_name} to the database`);
                            startApp();
                        })
                        .catch((err) => {
                            console.error(`Error adding employee: ${err}`);
                            startApp();
                        });
                });
                break;
            case 'Update Employee Role':
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'employee',
                        message: `Which employee's role do you want to update?`,
                        choices: employeeChoices
                    },
                    {
                        type: 'list',
                        name: 'role',
                        message: 'Which role do you want to assign to the selected employee?',
                        choices: roleChoices
                    }
                ])
                .then((response) => {
                    const role = roles.filter(role => role.title === response.role)[0];
                    const employee = employees.filter(employee => `${employee.first_name} ${employee.last_name}` === response.employee)[0];

                    updateEmployeeRole(role.id, employee.id)
                        .then(() => {
                            console.log(`Updated employee's role`);
                            startApp();
                        })
                        .catch((err) => {
                            console.error(`Error updating employee's role: ${err}`);
                            startApp();
                        });
                });
                break;
            case 'View All Roles':
                console.table(roles);
                startApp();
                break;
            case 'Add Role':
                const departments = await getAllDepartments();
                console.log(departments);

                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'title',
                        message: 'What is the name of the role?'
                    },
                    {
                        type: 'input',
                        name: 'salary',
                        message: 'What is the salary of the role?'
                    },
                    {
                        type: 'list',
                        name: 'department',
                        message: 'Which department does the role belong to?',
                        choices: departments
                    }
                ])
                .then((response) => {
                    const department = departments.filter(department => department.name === response.department)[0];

                    addRole(response.title, response.salary, department.id)
                        .then(() => {
                            console.log(`Added ${response.title} to the database`);
                            startApp();
                        })
                        .catch((err) => {
                            console.error(`Error adding department: ${err}`);
                            startApp();
                        });
                    });
                break;
            case 'View All Departments':
                getAllDepartments()
                    .then((departments) => {
                        console.table(departments);
                        startApp();
                    });
                break;
            case 'Add Department':
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'name',
                        message: 'What is the name of the department?'
                    }
                ])
                .then((response) => {
                    addDepartment(response.name)
                        .then(() => {
                            console.log(`Added ${response.name} to the database`);
                            startApp();
                        })
                        .catch((err) => {
                            console.error(`Error adding department: ${err}`);
                            startApp();
                        });
                    });
                break;
            case 'Quit':
                endConnection();
                break;
            default:
                console.log('Invalid choice. Please try again.');
                startApp();
        }
    });
}

startApp();
