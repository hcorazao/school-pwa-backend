const express = require('express');
const staffCtrl = require('../../controller/staff')
const router = express.Router();

router.post('/', staffCtrl.create);
router.get('/', staffCtrl.list);

module.exports = router;