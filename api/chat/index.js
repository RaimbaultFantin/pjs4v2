require('dotenv').config({ path: './api/.env' })

const io = require('socket.io')();
const PORT = process.env.SOCKET_PORT || 5001;
const message = require('../models/MessageModel');
/* TODO: probablement query le nom utilisateur 
 * ou bien tout un objet utilisateur pour log la connexion des utilisateur */

io.on('connection', socket => {
    console.log('user connected')
    
    /* Gestion d'envoie de message*/
    socket.on('message', async (data) => {
        socket.join(data.room); // on join la room de la socket
        try {
            await message.setMessage(data.room, data.idUser, new Date(), data.payload);
            io.in(data.room).emit('message', data); // on envoie le message a toute les socket de la room
        } catch(e) {
            console.log(e);
        }

    });

    /* Gestion de la deconnexion de la socket client*/
    socket.on('disconnect', () => {
        console.log('User disconnected ');
    })
});

io.listen(PORT);
console.log('Socket.io listening on port: ' + PORT);