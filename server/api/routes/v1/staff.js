const express = require('express');
const staffCtrl = require('../../controller/staff')
const router = express.Router();

router.post('/', staffCtrl.create);
router.get('/all', staffCtrl.list);
router.get('/', staffCtrl.getBySchoolId);

module.exports = router;