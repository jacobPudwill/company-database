const inquirer = require('inquirer');
const db = require('./config/connection');

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
                startApp();
                break;
            case 'Add Employee':
                startApp();
                break;
            case 'Update Employee Role':
                startApp();
                break;
            case 'View All Roles':
                startApp();
                break;
            case 'Add Role':
                startApp();
                break;
            case 'View All Departments':
                startApp();
                break;
            case 'Add Department':
                startApp();
                break;
            case 'Quit':
                console.log('Quitting the Company Database.');
                db.end();
                break;
            default:
                console.log('Invalid choice. Please try again.');
                startApp();
        }
    });
}

startApp();