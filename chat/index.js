var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(5001);

function handler (req, res) {
    res.writeHead(200);
    res.end(data);
}
io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    return data;
  });
});