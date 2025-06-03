const express = require('express');
const router = express.Router();

const { ProductsController } = require('../controllers/index');
let productsController = new ProductsController();

router.get('/', productsController.getAllProducts);
router.get('/:code', productsController.getProductByCode);

module.exports = router;