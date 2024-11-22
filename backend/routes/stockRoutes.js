const express = require('express');
const controller = require('../controllers/stockController')
const {getOverview} = require('../controllers/OverviewController')

const router = express.Router();

router.post('/stock-in', controller.createStockIn)
router.post('/stock-out', controller.createStockOut)
router.get('/overview', getOverview)
module.exports = router