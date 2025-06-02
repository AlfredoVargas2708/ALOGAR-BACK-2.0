const express = require('express');

const router = express.Router();

const usersRoutes = require('./users.routes');
const salesRoutes = require('./sales.routes')

router.use('/users', usersRoutes);
router.use('/sales', salesRoutes);

module.exports = router;
