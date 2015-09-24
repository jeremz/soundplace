var io = require('socket.io')();

// WHEN NEW USER
io.on('connection', function (socket) {

	console.log('New User Bitch');

	socket.join('home');

	var userId = socket.id;
	console.log(userId);

	socket.emit('userId', {userId:userId});
});

module.exports = io;