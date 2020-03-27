const pool = require('./dbConn');

class MessageModel {
    static setMessage = (idequipe,idpersonne,temporalite,texte) => {
        return new Promise((resolve, reject) => {
            pool.query('INSERT INTO `message` (id_equipe, id_personne, temporalite, texte) ' +
                'VALUES(?,?,?,?)', [idequipe, idpersonne, temporalite, texte], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    /* debug */
                    console.log('Message créée avec succès');
                    resolve(results.insertId);
                }
            });
        });
    }
};

module.exports = MessageModel;