require('dotenv').config()

/* Initialisation de l'app gerant l'api */
const express = require('express')
const app = express()

/* Initialisation de cors*/
const cors = require('cors')
app.use(cors())

/* Initilisation de bodyparser */
const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

/* On utilise un middleware qui gere le routage */
const routerMiddleware = require('./middlewares/router');
app.use(routerMiddleware);

/* Si aucune des routes n'a ete emprunter alors elle n'existe pas */
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404
    next(error)
})

/* Si l'erreur vient d'une route non existante alors statut 404 sinon 500 pour erreur serveur si elle provient d'une route */
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

app.listen(process.env.PORT || 5000)