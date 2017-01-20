// Nice to have: Something like this to have code doc and type annotations without redundancy: https://github.com/Kegsay/flow-jsdoc 

// Some quick JSDoc for editor hints.  JSDoc would allow document generation as well.
/**
  @typedef Employee
  @type {object}
  @property {string} _id - a readonly ID assigned by the database.
  @property {string} email - employee's email (also used as userid).
  @property {string} firstName - employee's first name.
  @property {string} lastName - employee's last name.
 */

// Quick in-memory database for now:
let employees = [{
    "_id": "587adbbaa95c62f71cd214fc",
    "email": "nadeem.mitha@gmail.com",
    "firstName": "Nadeem",
    "lastName": "Mitha"
},
{
    "_id": "123adbbaa95c62f71cd214fc",
    "email": "joe.developer@gmail.com",
    "firstName": "Joe",
    "lastName": "Developer"
}
];

/**
 * Get all employees
 * @param {Function} callback - An error first callback function e.g. (err, employees) => {}
 */
function getEmployees(callback) {
    // Real implementation (e.g. MongoDB) would require async, so our service needs to do the same despite using the local memory store:
    process.nextTick(() => {
        callback(null, employees);
    });
    // no error scenarios without a real DB.  An empty array is OK to return.
}

/**
 * Retrieve an employee by email (email is also userid)
 * @param {string} email
 * @param {Function} callback - An error first callback function e.g. (err, employee) => {}.  employee may be undefined or null if not found for given email.
 */
function getEmployeeByEmail(email, callback) {
    process.nextTick(() => {
        if (!_isValidEmail(email)) {
            let err = new Error('Provided email was invalid');
            err.name = 'EMPL_INVALID_EMAIL';
            callback(err);
            return;
        }
        let employee = employees.find((u) => u.email.toLowerCase() === email.toLowerCase());
        callback(/*error:*/null, employee);
    });
}

/**
 * Add a new employee
 * @param {Object} employee - A valid employee object with email, firstName and lastName
 * @param {Function} callback - function(err) {} .  If err in callback is undefined or null then the add operation succeeded.
 */
function addEmployee(employee, callback) {
    process.nextTick(() => {
        let errors = validateEmployee(employee);
        if (errors && errors.length > 0) {
            let err = new Error(`Provided employee has validation errors:\r\n${errors.join('\r\n')}`);
            err.name = 'EMPL_INVALID';
            callback(err);
            return;
        }

        // Check if employee already exists with same email:
        getEmployeeByEmail(employee.email, (err2, existingEmployee) => {
            if (existingEmployee) {
                let err = new Error(`An employee with the email "${employee.email}" already exists in the system`);
                err.name = 'EMPL_DUPLICATE_EMAIL';
                callback(err);
                return;
            }
            else {
                // All checks passed, add employee:
                employees.push(employee);
                callback();
            }
        });

    });
}


/**
 * Validates an employee object
 * @param {any} employee
 * @returns {string[]} List of any validation errors found, as a string array
 */
function validateEmployee(employee) {
    let errors = [];
    if (!employee.email || !_isValidEmail(employee.email)) {
        errors.push('Email is missing or invalid.');
    }
    if (!employee.firstName || !employee.lastName || !_isValidName(employee.firstName) || !_isValidName(employee.lastName)) {
        errors.push('First or last name is missing or invalid.');
    }
    return errors;
}

function _isValidName(name) {
    // Naive test but good enough for us, allows letters (including nearly all accented letters) as well as apostrophe and space:
    return (typeof name === "string" && /^[\' a-z\u00E0-\u00FC]+$/i.test(name));
}

// Adopted from http://stackoverflow.com/a/46181
function _isValidEmail(email) {
    if (typeof email !== "string") {
        return false;
    }
    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
}

module.exports = {
    getEmployees,
    getEmployeeByEmail,
    addEmployee,
    validateEmployee
}