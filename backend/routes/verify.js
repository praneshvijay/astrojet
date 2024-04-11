const express = require('express');
const controller = require('../controllers/verifyController');

const router = express.Router();

router.post('/verifycowin', controller.verifycertificates);

module.exports = router;