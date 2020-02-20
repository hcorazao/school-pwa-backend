const express = require('express');
const schoolCtrl = require('../../controller/school')
const router = express.Router();

router.get('/', schoolCtrl.list);
router.post('/sms', schoolCtrl.sendsms);
router.post('/verify', schoolCtrl.verifysms);
router.post('/', schoolCtrl.create);


module.exports = router;