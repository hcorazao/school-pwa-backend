const express = require('express');
const schoolRoutes = require('./school');
const staffRoutes = require('./staff');
const router = express.Router();

router.use('/school', schoolRoutes);
router.use('/staff', staffRoutes);

module.exports = router;