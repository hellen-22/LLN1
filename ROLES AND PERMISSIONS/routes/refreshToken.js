const express = require('express');
const router = express.Router('router');
const refreshTokenController = require('../controllers/refreshTokenContoller');

router.get('/', refreshTokenController.handleRefreshToken);

module.exports = router;