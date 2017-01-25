/* eslint-env node, jest */
const employeesService = require('./employees.service.js');

let incr=0;
function generateUniqueEmail() {
    return (`user_${incr++}@gmail.com`);
}

let okEmployeeEmail = generateUniqueEmail();

it('can add an employee with a unique email address', (done) => {
    let newEmployee = {
        email: okEmployeeEmail,
        firstName: 'Unique',
        lastName: 'Snowflake'
    };
    employeesService.addEmployee(newEmployee, (err) => {
        if (err) done.fail(err);
        else done();
    });
});

it('should not allow 2 employees with the same email address', (done) => {
    let email = generateUniqueEmail(); 
    
    let newEmployee = {
        email: email,
        firstName: 'IWas',
        lastName: 'ThereFirst'
    };
    employeesService.addEmployee(newEmployee, (err) => {
        if (err) done.fail(err);
        else done();
    });

    let newEmployee2 = {
        email: email, // same one as before
        firstName: 'ICame',
        lastName: 'TooLate'
    };
    employeesService.addEmployee(newEmployee2, (err) => {
        if (err) done(); // all good, we want an error
        else done.fail(new Error('System incorrectly allowed 2 employees with same email!'));
    });
});

it('can find employees by email', (done) => {
    employeesService.getEmployeeByEmail(okEmployeeEmail, (err, employee) => {
        if (err) done(err);
        else if (!employee) done(new Error('No error and no employee returned by getEmployeeByEmail()'));
        else done();
    });
});

it('should not find a non-existent employee by email', (done) => {
    employeesService.getEmployeeByEmail(generateUniqueEmail(), (err, employee) => {
        if (err) {
            done(err); // we don't want an error, just null/undefined for employee
        }
        else if (employee && employee.email) {
            done(new Error('System returned employee for non-existent email!'));
        }
        else {
            done();
        }
    });
});

it('can get all employees without erroring out', (done) => {
    employeesService.getEmployees((err, employees) => {
        if (err) {
            done(err)
        }
        else {
            console.log(`Employees returned in final getEmployees() test: ${JSON.stringify(employees)}` );
            done();
        }
    });
});