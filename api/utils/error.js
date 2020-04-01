module.exports = function (code, message) {
    return {
        error : {
            code,
            message,
            'getHelp' : 'url de la doc'
        }
    }
}