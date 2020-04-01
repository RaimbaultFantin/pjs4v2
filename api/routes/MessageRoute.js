const express = require('express');
const router = express.Router();
const error = require('../utils/error');

const message = require('../models/MessageModel');

router.get('/:idequipe', async (req, res) => {
    if (isNaN(req.params.idequipe)) {
        res.status(400).json(error(400, 'le parametre doit etre un nombre'));
    } else {
        try {
            let results = await message.getMessages(req.params.idequipe);
            res.status(200).json(results);
        } catch(e) {
            res.status(500).json(error(500, 'erreur bdd'));
        }
    }
});

module.exports = router;