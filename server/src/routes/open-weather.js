var express = require('express');
var router = express.Router();
var con = require('../controllers/open-weather');

router.post('/', con.getWeather);

module.exports = router;