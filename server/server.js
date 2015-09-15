var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000);

//SERVER IS STARTED
console.log("START");

app.get('/', function (req, res) {
  res.sendFile('./login.html', { root: 'front/views' });
});

//LET ACCESS TO PUBLIC FOLDER
app.use(express.static('./front/public'));

// WHEN NEW USER
io.on('connection', function (socket) {
	console.log('New User Bitch');
	socket.on('name', function (data) {
		console.log('User choose name : '+data.name);
		socket.broadcast.emit('newName', { name: data });
	});
});


