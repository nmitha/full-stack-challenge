const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

// Here we can have code/middleware common to all REST API calls, e.g. body-parser
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Delegate sub-routes under /api to their respective services:
router.use('/employees', require('./employees/employees.router.js'));

module.exports = router;