const express = require('express');
const router = express.Router();

const { SalesController } = require('../controllers/index');
let SalesCtrl = new SalesController();

router.get('/', SalesCtrl.getAllSales);

module.exports = router;