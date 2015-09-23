// -----------------------------
// Vendors

var express 	= require('express'),
	app 		= express(),
	server 		= require('http').Server(app),
	io 			= require('socket.io')(server),
	Parse 		= require('parse/node');

Parse.initialize("aim3575s3Q2lOjFMrBTYkkTiQXf8jm9hHBm5Bi2I", "r4c63xZ7ZNX0gUTijmjGPCQ8nXu2axVimZvG8eME");

require('./routes/routes')(app);

// -----------------------------
// Core

server.listen(3000);

//SERVER IS STARTED
console.log("START");

// WHEN NEW USER
io.on('connection', function (socket) {
	console.log('New User Bitch');
	var userId = socket.id;
	// userId = socket.io.engine.id;
	console.log(userId)
	socket.emit('userId', {userId:userId});

	socket.on('roomCreate', function (data) {
		console.log('New Room: '+data.roomId);
		// socket.broadcast.emit('newName', { name: data });
	});
	socket.on('room', function (data) {
		console.log('New Room: '+data.roomId);
		// socket.broadcast.emit('newName', { name: data });
		socket.join('room');
	});

	socket.on('name', function (data) {
		console.log('User choose name : '+data.name);
		socket.broadcast.emit('newName', { name: data });
	});
});


