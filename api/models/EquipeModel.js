const pool = require('./dbConn')
const coach = require('../models/CoachModel');

class EquipeModel {


    /* Fonction de crééation d'équipe, cela crééra un coach par la même occasion. 
     * Deux formes de retour possibles :
     * - resolve : l'id inséré
     * - reject : l'erreur
     */
    static setEquipe = (nom_equipe, id_sport, id_personne) => {
        return new Promise((resolve, reject) => {
            pool.query('INSERT INTO `equipe` (nom_equipe, id_sport) VALUES(?,?)', [nom_equipe, id_sport], async(err, results) => {
                if (err) {
                    reject(err);
                } else {
                    try {
                        await coach.setCoach(results.insertId, id_personne);
                    } catch (e) {}
                    console.log('Equipe créée avec succes !')
                    resolve(results.insertId);
                }
            });
        })
    };

    static getJoueurs = (id) => {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM `vue_membres_equipe` WHERE `id_equipe` = ?;', [id], (err, results) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                } else {
                    return resolve(results);
                }
            })
        })
    }

    static getCoachs = (id) => {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM `vue_equipe_coach` WHERE `id_equipe` = ?;', [id], (err, results) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                } else {
                    return resolve(results);
                }
            })
        })
    }

    /* Fonction de récupération de toutes les équipes d'une personne
     * Deux formes de retour possibles :
     * - resolve : les équipes
     * - reject : l'erreur
     */
    static getEquipesByPersonne = (id) => {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * FROM `vue_personne_equipes` WHERE `id_personne` = ?', [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            });
        });
    }
}

module.exports = EquipeModel;