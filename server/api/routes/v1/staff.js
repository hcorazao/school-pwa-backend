const express = require('express');
const staffCtrl = require('../../controller/staff')
const router = express.Router();

router.get('/data', staffCtrl.list);
router.post('/add', staffCtrl.create);


module.exports = router;