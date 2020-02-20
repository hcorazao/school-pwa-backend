const express = require('express');
const schoolCtrl = require('../../controller/school')
const router = express.Router();

router.get('/', schoolCtrl.list);
router.post('/otp-send', schoolCtrl.sendsms);
router.post('/otp-verify', schoolCtrl.verifysms);
router.post('/', schoolCtrl.create);


module.exports = router;