var express = require('express');
var router = express.Router();
let indexCtrl = require('../controllers/index.js')

/* GET home page. */
router.get('/', indexCtrl.index)

module.exports = router;
