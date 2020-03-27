// Imports
const jwt = require('jsonwebtoken');

// Clef secret de la signature du JWT, on pourra la changer
const JWT_SECRET = 'laclefprivedutokenonpourrachangerca'

module.exports = {
    genererToken: function(id) {
        return jwt.sign({
                'idP': id
            },
            JWT_SECRET, {
                expiresIn: '1h'
            })
    },
    parseAuthorization: function(authorization) {
        return (authorization !== null) ? authorization.replace('Bearer ', '') : null;
    },
    checkToken: function(authorization) {
        var id = -1;
        var token = this.parseAuthorization(authorization);
        if (token !== null) {
            try {
                var jwtToken = jwt.verify(token, JWT_SECRET);
                if (jwtToken !== null) {
                    id = jwtToken.idP;
                }
            } catch (err) {}
        }
        return id;
    }
}