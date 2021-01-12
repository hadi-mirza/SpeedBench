var express = require('express');
var router = express.Router();
let viewAllCtrl = require('../controllers/viewAll.js')

/* GET home page. */
router.get('/', viewAllCtrl.index)
router.get('/:id', viewAllCtrl.show);

module.exports = router;
