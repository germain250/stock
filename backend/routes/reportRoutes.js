const express = require('express');
const controller = require('../controllers/reportController');
const router = express.Router();


router.get('/', controller.getAllLogs)
router.get('/notifications', controller.getAllNotifications)
router.get('/activity-log', controller.generateActivityLogReport),
router.get('/products', controller.generateProductReport),
router.get('/stock-in', controller.generateStockInReport),
router.get('/stock-out', controller.generateStockOutReport),
router.get('/combined', controller.generateCombinedReport),

module.exports = router