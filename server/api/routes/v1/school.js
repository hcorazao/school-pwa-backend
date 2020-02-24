const express = require('express');
const schoolCtrl = require('../../controller/school')
const multer = require('multer');
const validate = require("express-validation");
const { createStudent } = require('../../validations/student.validation')

// multer storage and image rename
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/student')
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
router.post('/add', type, validate(createStudent), schoolCtrl.create);
//router.post('/image-upload', type, schoolCtrl.uploadImage);
router.get('/data', schoolCtrl.list);
router.get('/:id', schoolCtrl.getById);


module.exports = router;