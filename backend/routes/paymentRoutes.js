const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/', paymentController.recordPayment);
router.get('/:order_id', paymentController.getPayments);

module.exports = router;
