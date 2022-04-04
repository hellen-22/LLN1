const express = require('express');
const router = express.Router('router');
const loginController = require('../controllers/loginController');

router.post('/', loginController.handleLogin);

module.exports = router;