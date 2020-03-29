/* Récuperation du routeur */
const express = require('express');
const router = express.Router();

/* Imports */
const jwtUtils = require('../utils/jwt.utils')
const model = require('../models/EvenementModel');
const bcrypt = require('bcrypt');


// Recup utils erreur
const error = require('../utils/error');

router.get('/get/:id', async(req, res) => {
    var token = req.headers["authorization"];
    /*  On stock l'identifiant de l'utilisateur contenu dans le token */
    var id = jwtUtils.checkToken(token);
    if (id < 0) {
        return res.status(400).json(error(400, "Token invalide"));
    }

    try {
        let events = await model.getEvent(req.params.id, id);
        return res.status(200).json({
            'succes': 'succes',
            'datas': events
        });
    } catch (e) {
        return res.status(500).json(error(500, e));
    }
})

router.post('/add', async(req, res) => {
    if (req.body.id_equipe === undefined || req.body.temporalite_debut === undefined || req.body.temporalite_fin === undefined || req.body.texte === undefined) {
        return res.status(400).json(error(400, "Parametres manquant"));
    }
    var token = req.headers["authorization"];
    /*  On stock l'identifiant de l'utilisateur contenu dans le token */
    var id = jwtUtils.checkToken(token);
    if (id < 0) {
        return res.status(400).json(error(400, "Token invalide"));
    }

    try {
        await model.setEvent(req.body.id_equipe, id, req.body.temporalite_debut, req.body.temporalite_fin, req.body.texte);
        return res.status(200).json({
            'succes': 'Evenement ajouté avec succès'
        });
    } catch (e) {
        return res.status(500).json(error(500, e));
    }
})

module.exports = router;