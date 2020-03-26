// Imports
const jwt = require('jsonwebtoken');

// Clef secret de la signature du JWT, on pourra la changer
const JWT_SECRET = 'laclefprivedutokenonpourrachangerca'

module.exports = {
    genererToken: function(personne) {
        return jwt.sign({
                idPersonne: personne.idPersonne
            },
            JWT_SECRET, {
                expiresIn: '1h'
            })
    },
    parseAuthorization: function(authorization) {
        return (authorization !== null) ? authorization.replace('Bearer ', '') : null;
    },
    checkToken: function(authorization) {
        var idPersonne = -1;
        var token = this.parseAuthorization(authorization);
        if (token !== null) {
            try {
                /* Await ? */
                var jwtToken = jwt.verify(token, JWT_SECRET);
                if (jwtToken !== null) {
                    idPersonne = jwtToken.idPersonne
                }
            } catch (err) {

            }
        }
        return idPersonne;
    }
}