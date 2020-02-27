const express = require('express');
const schoolCtrl = require('../../controller/school')
const multer = require('multer');


// multer storage and image rename
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/school')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })
const type = upload.single('photo');

// Routes
const router = express.Router();


router.post('/otp-send', schoolCtrl.sendsms);

router.get('/otp-verify', schoolCtrl.verifysms);

router.post('/', type,  schoolCtrl.create);

router.get('/', schoolCtrl.list);

router.get('/:id', schoolCtrl.getById);


module.exports = router;