var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  io.emit('chat message', 'HELLO!!!!!');


  socket.on('disconnect', () => {
    console.log('user disconnected');
    io.emit('chat message', 'Goodbye');
  });
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
});
});

// io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); // This will emit the event to all connected sockets

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

socket.on('typing', () => {
  socket.broadcast.emit('typing', 'Typing');
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
