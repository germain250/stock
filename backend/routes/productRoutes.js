const controller = require('../controllers/productController');
const express = require('express');
const router = express.Router();

router.get('/',  controller.getProducts),
    router.post('/add', controller.addProduct, controller.addProduct),
    router.get('/:id',  controller.getProductByIdMiddleWare,controller.getProductById),
    router.patch('/update/:id', controller.getProductByIdMiddleWare,controller.updateProduct),
    router.delete('/delete/:id',controller.getProductByIdMiddleWare,controller.deleteProduct);


module.exports = router;