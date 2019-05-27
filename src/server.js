var app = require('express');
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(8089);

// app.get('/', function(req, res) {
//     res.sendFile(__dirname + '/index.html');
// });

io.on('connect', function(socket){
    console.log('client connect');
    socket.on('message', function(data) {
        console.log('message', data);
        io.to(data.to).emit('message', {message: data});
    });
    socket.on('join', function(data) {
        console.log('join', data);
        socket.join(data);
        console.log('rooms:',socket.rooms);
        io.to(data).emit('joined', {message: data});
    });
    socket.on('leave room', function(data) {
        console.log('leave room', data);
        io.to(data.room).emit('leave room', {message: data});
        socket.leave(data.room);
    });
    socket.on('disconnect', function(data) {
        console.log('userdisconnect');
        io.emit('user disconnect',{username:  data.username});
    });
});
