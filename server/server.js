var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000);

//SERVER IS STARTED
console.log("START");

app.get('/', function (req, res) {
  res.sendFile('./index.html', { root: 'front' });
});

//LET ACCESS TO PUBLIC FOLDER
app.use(express.static('./front/public'));

// WHEN NEW USER
io.on('connection', function (socket) {
	console.log('New User Bitch');
	socket.on('name', function (data) {
		socket.broadcast.emit('newName', { name: data });
	});
});


