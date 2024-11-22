const express = require('express');
const controller = require('../controllers/userController');
const { authenticateJWT, authorizeRole } = require('../middlewares/authMiddleware');



const router = express.Router();


router.post('/login', controller.Login)
router.post('refresh', controller.refreshToken)
router.post('/register', controller.Register)
router.get('/', authenticateJWT, authorizeRole(['admin']),controller.getAllUsers)
router.delete('/delete/:id', authenticateJWT, controller.deleteUser)
router.patch('/update/:id', authenticateJWT, controller.updateUser)
router.post('/logout',authenticateJWT, controller.Logout)
router.get('/user/:id', controller.getSingleUser)

module.exports = router;
