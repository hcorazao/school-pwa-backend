const express = require('express');
const schoolCtrl = require('../../controller/school')
const router = express.Router();

router.get('/data', schoolCtrl.list);
router.post('/otp-send', schoolCtrl.sendsms);
router.post('/otp-verify', schoolCtrl.verifysms);
router.post('/add', schoolCtrl.create);

router.get('/:id', schoolCtrl.getById);


module.exports = router;