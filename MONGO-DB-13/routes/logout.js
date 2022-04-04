const express = require('express');
const router = express.Router('router');
const logoutController = require('../controllers/logoutController');

router.get('/', logoutController.handleLogout);

module.exports = router;