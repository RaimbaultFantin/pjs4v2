const pool = require('./dbConn');

class MessageModel {
    
    /* cree un nouveau message */
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

    /* recupere tous les message  */
    static getMessages = (idequipe) => {
        return new Promise((resolve,reject) => {
            pool.query('SELECT * FROM `message` '+
                    'WHERE `id_equipe` = ?', idequipe, (err,results) => {
                if(err) {
                    reject(err);
                } else {
                    console.log('message recupere avec succes');
                    resolve(results);
                }
           });
        });
    }
};

module.exports = MessageModel;