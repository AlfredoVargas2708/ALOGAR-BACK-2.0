const express = require('express');

const router = express.Router();

const usersRoutes = require('./users.routes');
const salesRoutes = require('./sales.routes');
const productsRoutes = require('./products.routes');

router.use('/users', usersRoutes);
router.use('/sales', salesRoutes);
router.use('/products', productsRoutes);

module.exports = router;
