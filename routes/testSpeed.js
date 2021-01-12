var express = require('express');
var router = express.Router();
let testSpeedCtrl = require('../controllers/testSpeed.js')

/* GET home page. */
router.get('/', testSpeedCtrl.index)
router.post('/', testSpeedCtrl.create)

module.exports = router;
