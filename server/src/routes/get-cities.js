var express = require('express');
var router = express.Router();
var con = require('../controllers/get-cities');

router.post('/', con.getCities);

module.exports = router;