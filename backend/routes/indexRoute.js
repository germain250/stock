const express = require('express');
const router = express();
const categoryRoutes = require('./categoryRoutes');
const productRoutes = require('./productRoutes');
const authRoutes = require('./authRoutes');
const stockRoutes = require('./stockRoutes')
const reportRoutes = require('./reportRoutes')
const middleware = require('../middlewares/authMiddleware')



router.use('/categories', middleware.authenticateJWT, categoryRoutes)
router.get('/', middleware.authenticateJWT, async(req,res) =>{
    res.json(req.user)
})
router.use('/products', middleware.authenticateJWT,productRoutes)
router.use('/auth', authRoutes)
router.use('/stock',middleware.authenticateJWT, stockRoutes)
router.use('/report', middleware.authenticateJWT, reportRoutes)


module.exports = router;