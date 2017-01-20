const express = require('express');
const employeesService = require('./employees.service.js');

const router = express.Router();

// E.g. GET /api/employees/nadeem.mitha@gmail.com
router.get('/:email', (req, res) => {
    let email = req.params.email; // email can't be empty if we're here, if it's invalid that should be handled by the service
    employeesService.getEmployeeByEmail(email, (err, employee) => {
        if (employee) {
            return res.json(employee);
        }
        else if (!err && !employee) {
            // No issues but nothing found:
            return res.status(404).json({
                error: {
                    code: "EMPL_NOT_FOUND",
                    detail: `No employee found with email/userid "${email}"`
                }
            });
        }
        else { // bad email, DB issue, etc.
            return res.status(500).json({
                error: {
                    code: err && err.name ? err.name : 'EMPL_FETCH_ERR',
                    detail: err && err.message ? err.message : 'An error occurred retrieving user by email address'
                }
            });
        }
    });

});

// Get employees (returns an empty array if there are none)
router.get('/', (req, res) => {
    employeesService.getEmployees((err, employees) => {
        // TODO: Implement error handling (in-memory store does not generate errors currently)
        return res.json(employees);
    });
});

// Post new employee to add.  Expects JSON or URL key=value&key2=value format via body-parser.
router.post('/', (req, res) => {
    if (!req.body) {
        return res.sendStatus(400); // bad request
    }

    // Unsafe to treat req.body as an employee object. Copying over only relevant key/values from body to protect from malicious over-posting (e.g. setting future isAdmin property via curl POST).
    let newEmployee = {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    };

    // Submit new employee to service.  There may be validation errors due to missing fields or other issues (e.g. duplicate entry).
    employeesService.addEmployee(newEmployee, (err) => {
        if (err) {
            return res.status(/*Unprocessable Entity:*/422).json({
                error: {
                    code: err.name || 'EMPL_ADD_ERR',
                    detail: err.message || 'An error occurred adding new employee'
                }
            });
        }
        else {
            return res.sendStatus(200); // OK
        }
    });
});

router.delete('/:email', (req, res) => {
    // TODO
    return res.sendStatus(501); // not implemented
});

module.exports = router;