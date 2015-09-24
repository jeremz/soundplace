// -----------------------------
// Vendors

var express 	= require('express'),
	cors 		= require('cors'),
	app 		= express(),
	server 		= require('http').Server(app),
	io 			= require('./io');
	Parse 		= require('parse/node'),
	bodyParser  = require('body-parser');

app.use(cors());

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));  

Parse.initialize("aim3575s3Q2lOjFMrBTYkkTiQXf8jm9hHBm5Bi2I", "r4c63xZ7ZNX0gUTijmjGPCQ8nXu2axVimZvG8eME");

require('./routes/routes')(app);

// -----------------------------
// Core

server.listen(3000);

io.attach(server);

//SERVER IS STARTED
console.log("START");


