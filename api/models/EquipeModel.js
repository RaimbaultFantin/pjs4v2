const pool = require('./dbConn')

class EquipeModel {

    static getEquipesByPersonne = (id) => {
        console.log(id);
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