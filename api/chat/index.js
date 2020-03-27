const io = require('socket.io')();
const PORT = process.env.SOCKET_PORT || 5001;

io.on('connection', socket => {
    socket.on('message', (room,data) => {
        socket.join(room);
        io.in(room).emit('message',room, data);
    });
});

io.listen(PORT);
console.log('Socket.io listening on port: ' + PORT);