const express = require('express');
const { createpaymentsession } = require('../controllers/paymentController');


const router = express.Router();

router.post('/create-checkout-session', createpaymentsession);

module.exports = router;