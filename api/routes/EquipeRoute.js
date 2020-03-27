/* Récuperation du routeur */
const express = require('express');
const router = express.Router();

/* Imports */
const jwtUtils = require('../utils/jwt.utils')
const model = require('../models/EquipeModel');
const bcrypt = require('bcrypt');


// Recup utils erreur
const error = require('../utils/error');

router.get('/get/bypersonne', async(req, res, next) => {
    var token = req.headers['authorization'];
    /*  On stock l'identifiant de l'utilisateur contenu dans le token */
    var id = jwtUtils.checkToken(token);
    console.log();
    if (id < 0) {
        return res.status(400).json(error(400, 'Token invalide'));
    }

    try {
        console.log(id);
        let results = await model.getEquipesByPersonne(id);
        res.json(results);
    } catch (e) {
        /* Le message d'erreur devra renvoyer le message sql lisible et sans informations sur la BDD */
        return res.status(500).json(error(500, e));
    }
});

module.exports = router;