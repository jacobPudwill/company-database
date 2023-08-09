const inquirer = require('inquirer');
const { 
    getAllDepartments,
    addDepartment,
    getAllRoles,
    addRole,
    getAllEmployees,
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
    .then((response) => {
        switch (response.choice) {
            case 'View All Employees':
                getAllEmployees()
                    .then((employees) => {
                        console.table(employees);
                        startApp();
                    });
                break;
            case 'Add Employee':
                startApp();
                break;
            case 'Update Employee Role':
                startApp();
                break;
            case 'View All Roles':
                getAllRoles()
                    .then((roles) => {
                        console.table(roles);
                        startApp();
                    });
                break;
            case 'Add Role':
                getAllDepartments()
                    .then((departments) => {
                    const departmentChoices = departments.map((department) => ({
                        name: department.name,
                        id: department.id
                    }));

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
                            choices: departmentChoices
                        }
                    ])
                    .then((response) => {
                        const department = departmentChoices.filter(department => department.name === response.department);

                        addRole(response.title, response.salary, department[0].id)
                            .then(() => {
                                console.log(`Added ${response.title} to the database`);
                                startApp();
                            })
                            .catch((err) => {
                                console.error(`Error adding department: ${err}`);
                                startApp();
                            });
                        });
                    })
                    .catch((err) => {
                        console.error(`Error fetching departments: ${err}`);
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
