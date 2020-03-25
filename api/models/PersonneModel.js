const pool = require('./dbConn')

class PersonneModel {

    /* Fonction d'ajout, paramètres obligatoires non null : mail, pass, nom, prenom
     * Deux formes de retour possibles :
     * - resolve : on renvoie l'identifiant généré par l'auto increment de la bdd
     * - reject : l'erreur
     */
    static setPersonne = (mail, pass, prenom, nom) => {
        return new Promise((resolve, reject) => {
            pool.query('INSERT INTO `personne` (mail, pass, prenom, nom) ' +
                'VALUES(?,?,?,?)', [mail, pass, prenom, nom], (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        /* debug */
                        console.log('Personne créée avec succès')
                        resolve(results.insertId);
                    }
                });
        });
    }

    /* Fonction d'accès par identifiant
     * Deux formes de retour possibles :
     * - resolve : le tuple demandé
     * - reject : l'erreur
     */
    static getPersonneById = (id) => {
        return new Promise((resolve, reject) => {
            pool.query('SELECT *' +
                'FROM `personne`' +
                'WHERE `id` = ?', [id],
                (err, results) => {
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(results)
                    }
                });
        })
    }

    /* Fonction d'accès par identifiant
     * Deux formes de retour possibles :
     * - resolve : le tuple demandé
     * - reject : l'erreur
     */
    static getPersonneByMail = (mail) => {
        return new Promise((resolve, reject) => {
            pool.query('SELECT *' +
                'FROM `personne`' +
                'WHERE `mail` = ?', [mail],
                (err, results) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(results)
                    }
                });
        })
    }

    /* Fonction de suppression par identifiant
     * Deux formes de retour possibles :
     * - resolve : le tuple supprimé
     * - reject : l'erreur
     */
    static deletePersonneById = (id) => {
        return new Promise((resolve, reject) => {
            pool.query('DELETE ' +
                'FROM `personne`' +
                'WHERE `id` = ?', [id],
                (err, results) => {
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(results)
                    }
                });
        })
    }
}

module.exports = PersonneModel;