/* Imports */
const express = require('express');
const jwtUtils = require('../utils/jwt.utils')
const model = require('../model/PersonneModel');
const bcrypt = require('bcrypt');

/* Création des Regex */
const mailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

/* Récuperation du routeur */
const router = express.Router();

/* ------------------------- Définition des routes SANS JWT ------------------------- */

router.post('/inscription', async(req, res, next) => {
    /* On commence par vérifier que les paramètres obligatoires sont présents dans la requête */
    if (req.body.mail === undefined || req.body.pass === undefined || req.body.nom === undefined || req.body.prenom === undefined) {
        return res.status(400).json({ 'error': 'paramètre manquant' });
    }

    /* On utilise un REGEX pour la mail et le MDP, on le fait aussi sur le front mais vaut mieux double check */
    if (!mailRegex.test(req.body.mail)) {
        return res.status(400).json({ 'error': 'mail non valide' });
    }
    if (!passRegex.test(req.body.pass)) {
        return res.status(400).json({ 'error': 'mdp non valide' });
    }

    /* On vérifie que le mail n'est pas déjà enregistré en BDD */
    try {
        let rep = await model.getPersonneByMail(req.body.mail);
        if (rep[0]) {
            return res.status(400).json({ 'error': 'mail déjà répertorié' });
        }
    } catch (e) {
        return res.status(500).json({ 'error': 'erreur dans la requête' });
    }

    /* On crypte le mot de passe, puis en envoie la requête à la BDD */
    try {
        let pass = await bcrypt.hash(req.body.pass, 16);
        let id = await model.setPersonne(req.body.mail, pass, req.body.prenom, req.body.nom);
        /* On renvoie un JWT, comme ça le login peut se faire automatiquement derière */
        return res.status(200).json({
            'success': 'Personne ajoutée avec succès',
            'token': jwtUtils.genererToken(id)
        });
    } catch (e) {
        /* debug */
        console.log(e.sqlMessage);
        /* Le message d'erreur devra renvoyer le message sql lisible et sans informations sur la BDD */
        return res.status(500).json({ 'error': 'le serveur a rencontré un problème' });
    }
});

router.post('/login', async(req, res, next) => {
    /* On commence par vérifier que les paramètres obligatoires sont présents dans la requête */
    if (req.body.mail === undefined || req.body.pass === undefined) {
        return res.status(400).json({ 'error': 'paramètre manquant' });
    }

    /* On utilise un REGEX pour la mail, le MDP */
    if (!mailRegex.test(req.body.mail)) {
        return res.status(400).json({ 'error': 'mail non valide' });
    }
    if (!passRegex.test(req.body.pass)) {
        return res.status(400).json({ 'error': 'mdp non valide' });
    }

    /* On vérifie que le mail est bien enregistré */
    try {
        var rep = await model.getPersonneByMail(req.body.mail);
        if (!rep[0]) {
            return res.status(400).json({ 'error': 'mail non répertorié' });
        }
    } catch (e) {
        return res.status(400).json(rep);
    }

    /* On compare le mdp envoyé pas le client avec celui qu'on a retrouvé en BDD */
    try {

        await bcrypt.compare(req.body.pass, rep[0].pass.toString());
        return res.status(200).json({
            'success': 'Personne identifiée avec succès',
            /* On génère le token de la personne en y plaçant son identifiant */
            'token': jwtUtils.genererToken(rep[0])
        });
    } catch (e) {
        /* debug */
        console.log(e.sqlMessage);
        /* Le message d'erreur devra renvoyer le message sql lisible et sans informations sur la BDD */
        return res.status(500).json({ 'error': 'le serveur a rencontré un problème' });
    }
});

/* ------------------------- Définition des routes AVEC JWT ------------------------- */

router.get('/:id', async(req, res, next) => {

    var token = req.headers['authorization'];
    /*  On stock l'identifiant de l'utilisateur contenu dans le token */
    var id = jwtUtils.checkToken(token);
    if (id < 0) {
        return res.status(500).json({ 'error': 'Token invalide' });
    }

    try {
        let results = await model.getPersonneById(req.params.id)
        res.json(results);
    } catch (e) {
        /* debug */
        console.log(e.sqlMessage);
        /* Le message d'erreur devra renvoyer le message sql lisible et sans informations sur la BDD */
        return res.status(500).json({ 'error': 'le serveur a rencontré un problème' });
    }
})

module.exports = router