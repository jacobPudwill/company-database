const inquirer = require('inquirer');
const { 
    getAllDepartments,
    addDepartment,
    getAllRoles,
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
                getAllEmployees().then((employees) => {
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
                getAllRoles().then((roles) => {
                    console.table(roles);
                    startApp();
                });
                break;
            case 'Add Role':
                startApp();
                break;
            case 'View All Departments':
                getAllDepartments().then((departments) => {
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
                            console.log(`Error adding department: ${err}`);
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
