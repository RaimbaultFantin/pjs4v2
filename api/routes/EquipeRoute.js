/* Récuperation du routeur */
const express = require('express');
const router = express.Router();

/* Imports */
const jwtUtils = require('../utils/jwt.utils')
const model = require('../models/EquipeModel');
const bcrypt = require('bcrypt');


// Recup utils erreur
const error = require('../utils/error');

router.post('/inscription', async(req, res) => {
    var token = req.headers['authorization'];
    /*  On stock l'identifiant de l'utilisateur contenu dans le token */
    var id = jwtUtils.checkToken(token);
    console.log();
    if (id < 0) {
        return res.status(400).json(error(400, 'Token invalide'));
    }

    try {
        /* La méthode setEquipe ajoutera aussi automatiquement l'utilisateur créant l'équipe en tant que coach de cette équipe */
        let results = model.setEquipe(req.body.nom_equipe, req.body.id_sport, id);
        return res.status(200).json({
            'succes': 'Equipe crée avec succes',
        })
    } catch (e) {
        return res.status(500).json(error(500, e));
    }
});

router.get('/get/coachs/:id', async(req, res) => {
    var token = req.headers['authorization'];
    /*  On stock l'identifiant de l'utilisateur contenu dans le token */
    var id = jwtUtils.checkToken(token);
    console.log();
    if (id < 0) {
        return res.status(400).json(error(400, 'Token invalide'));
    }

    try {
        let results = await model.getCoachs(req.params.id);
        return res.status(200).json({
            'succes': 'succes',
            'datas': results
        });
    } catch (e) {
        return res.status(500).json(error(500, e));
    }
})

router.get('/get/joueurs/:id', async(req, res) => {
    var token = req.headers['authorization'];
    /*  On stock l'identifiant de l'utilisateur contenu dans le token */
    var id = jwtUtils.checkToken(token);
    console.log();
    if (id < 0) {
        return res.status(400).json(error(400, 'Token invalide'));
    }

    try {
        let results = await model.getJoueurs(req.params.id);
        return res.status(200).json({
            'succes': 'succes',
            'datas': results
        });
    } catch (e) {
        return res.status(500).json(error(500, e));
    }
})

router.get('/get/membres/:id', async(req, res) => {
    var token = req.headers['authorization'];
    /*  On stock l'identifiant de l'utilisateur contenu dans le token */
    var id = jwtUtils.checkToken(token);
    console.log();
    if (id < 0) {
        return res.status(400).json(error(400, 'Token invalide'));
    }

    try {
        let coachs = await model.getCoachs(req.params.id);
        let joueurs = await model.getJoueurs(req.params.id);
        return res.status(200).json({
            'succes': 'succes',
            'datas': {
                'coachs': coachs,
                'joueurs': joueurs
            }
        });
    } catch (e) {
        return res.status(500).json(error(500, e));
    }
})

router.get('/get/bypersonne', async(req, res) => {
    var token = req.headers['authorization'];
    /*  On stock l'identifiant de l'utilisateur contenu dans le token */
    var id = jwtUtils.checkToken(token);
    console.log();
    if (id < 0) {
        return res.status(400).json(error(400, 'Token invalide'));
    }

    try {
        let results = await model.getEquipesByPersonne(id);
        return res.status(200).json(results);
    } catch (e) {
        /* Le message d'erreur devra renvoyer le message sql lisible et sans informations sur la BDD */
        return res.status(500).json(error(500, e));
    }
});

module.exports = router;