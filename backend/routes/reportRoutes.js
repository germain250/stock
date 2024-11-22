const express = require('express');
const controller = require('../controllers/reportController');
const router = express.Router();


router.get('/', controller.getAllLogs)
router.get('/notifications', controller.getAllNotifications)


module.exports = router