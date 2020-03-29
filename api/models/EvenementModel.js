const pool = require('./dbConn')
const equipe = require('../models/EquipeModel');

class EvenementModel {

    static getEvent = (id_equipe, id_personne) => {
        return new Promise(async(resolve, reject) => {

            try {
                var joueurs = await equipe.getJoueurs(id_equipe);
                var coachs = await equipe.getCoachs(id_equipe);
                let check = false;
                for (var i in joueurs) {
                    if (joueurs[i].id_personne === id_personne)
                        check = true;
                }
                for (var i in coachs) {
                    if (coachs[i].id_personne === id_personne)
                        check = true;
                }

                if (!check)
                    return reject('Vous n\'êtes pas membre de cette équipe');
            } catch (e) {
                console.log(e);
                return reject(e);
            }

            pool.query('SELECT * FROM `evenement` WHERE `id_equipe` = ?', [id_equipe], (err, results) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(results);
                }
            });
        })
    }

    static setEvent = async(id_equipe, id_personne, temporalite_debut, temporalite_fin, texte) => {

        return new Promise(async(resolve, reject) => {

            try {
                var coachs = await equipe.getCoachs(id_equipe);
                let check = false;
                for (var i in coachs) {
                    if (coachs[i].id_personne === id_personne)
                        check = true;
                }
                if (!check)
                    return reject('Vous n\'êtes pas coach de cette équipe');
            } catch (e) {
                return reject(e);
            }

            try {
                var evenements = await this.getEvent(id_equipe);
                for (var i in evenements) {
                    let td = new Date(evenements[i].temporalite_debut);
                    let tf = new Date(evenements[i].temporalite_fin);
                    let new_td = new Date(temporalite_debut);
                    let new_tf = new Date(temporalite_fin);
                    if (new_td >= td && new_td <= tf)
                        return reject('Votre temporalite de début empiete sur un déjà créé');
                    if (new_tf >= td && new_tf <= tf)
                        return reject('Votre temporalite de fin empiete sur un déjà créé');
                }
            } catch (e) {
                return reject(e);
            }

            pool.query('INSERT INTO `evenement` (id_equipe, id_personne, temporalite_debut, temporalite_fin, texte)' +
                'VALUES(?,?,?,?,?)', [id_equipe, id_personne, temporalite_debut, temporalite_fin, texte], (err) => {
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve();
                    }
                });
        })
    };
}

module.exports = EvenementModel;