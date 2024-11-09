const controller = require('../controllers/categoryController');
const express = require('express');

const router = express.Router();

router.get('/', controller.getCategories)
router.get('/:id', controller.getCategoryByIdMiddleWare, controller.getCategoryById)
router.post('/add', controller.createCategory)
router.delete('/delete/:id', controller.getCategoryByIdMiddleWare, controller.deleteCategory);
router.patch('/update/:id', controller.getCategoryByIdMiddleWare, controller.updateCategory)

module.exports = router;