const express = require('express');
const schoolRoutes = require('./school');
const router = express.Router();

router.use('/school', schoolRoutes);

module.exports = router;