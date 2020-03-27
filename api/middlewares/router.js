const express = require('express');
const router = express.Router();

const userRoutes = require('../routes/PersonneRoute');
router.use('/user', userRoutes);
const equipeRoutes = require('../routes/EquipeRoute');
router.use('/equipe', equipeRoutes);

module.exports = router;