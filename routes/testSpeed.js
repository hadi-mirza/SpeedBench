var express = require('express');
var router = express.Router();
let testSpeedCtrl = require('../controllers/testSpeed.js')

/* GET home page. */
router.get('/', testSpeedCtrl.index)

module.exports = router;
