const express = require('express');
const router = express.Router();
const { UsersController } = require('../controllers/index')

let UsersCtrl = new UsersController();

router.get('/', UsersCtrl.getAllUsers);
router.get('/:username', UsersCtrl.getUserByUsername);
router.post('/login', UsersCtrl.login);
router.post('/register', UsersCtrl.register);

module.exports = router;