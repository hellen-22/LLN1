const express = require('express');
const router = express.Router();
const path = require('path');
const employeeController = require('./../../controllers/employeesController')
const verifyJWT = require('../../middleware/verifyJWT');

router.route('/')
    .get(employeeController.getAllEmployees)
    .post(employeeController.createNewEmployee)
    .put(employeeController.updateEmployee)
    .delete(employeeController.deleteEmployee);


router.route('/:id')
    .get(employeeController.getAnEmployee);


module.exports = router;