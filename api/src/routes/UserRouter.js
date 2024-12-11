const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);
router.put('/update-profile/:id', userController.updateUser);
router.get('/detail-profile/:id', userController.getUser);

module.exports = router;