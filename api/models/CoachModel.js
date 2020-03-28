const pool = require('./dbConn')

class CoachModel {

    static setCoach = async(id_equipe, id_personne) => {
        return new Promise((resolve, reject) => {
            pool.query('INSERT INTO `coach` (id_equipe, id_personne) VALUES(?,?)', [id_equipe, id_personne], (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        })
    };
}

module.exports = CoachModel;