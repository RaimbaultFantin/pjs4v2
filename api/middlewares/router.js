const express = require('express');
const router = express.Router();

const userRoutes = require('../routes/PersonneRoute');
router.use('/user', userRoutes);


module.exports = router;