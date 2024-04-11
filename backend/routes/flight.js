const express = require('express');
const controller = require('../controllers/flightController');

const router = express.Router();

router.get('/airports', controller.getAirports);
router.get('/flightsearch/:source/:destination/:day', controller.getFlights);
router.get('/roundflightsearch/:source/:destination/:day1/:day2', controller.getroundFlights);

module.exports = router;