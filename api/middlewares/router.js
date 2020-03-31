const express = require('express');
const router = express.Router();

const userRoutes = require('../routes/PersonneRoute');
router.use('/user', userRoutes);

const equipeRoutes = require('../routes/EquipeRoute');
router.use('/equipe', equipeRoutes);

const messageRoutes = require('../routes/MessageRoute');
router.use('/message', messageRoutes);

module.exports = router;