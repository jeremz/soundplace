// Silence is golden
// -----------------------------
// Vendors

var $ 			= require('jquery'),
	Backbone 	= require('backbone'),
	Marionette 	= require('backbone.marionette');

var Controller  = require('./controller');
var Router 		= require('./router');



// -----------------------------
// Core

var app = new Marionette.Application({
	socketID: 0,

	size: function(){
		// TODO
	},
});

app.addInitializer(function(options){
	new Router({
		controller: controller
	});

	Parse.initialize("aim3575s3Q2lOjFMrBTYkkTiQXf8jm9hHBm5Bi2I", "r4c63xZ7ZNX0gUTijmjGPCQ8nXu2axVimZvG8eME");
});

var controller = new Controller({
	app: app
});

app.on("start", function(){
	// Start history
	if (Backbone.history){
		Backbone.history.start({pushState: true});
    }

    // Get GPS
 	navigator.geolocation.getCurrentPosition(function(position){
		app.gps = position;
	}, function(error){
		console.error(error);
	});
});

app.start();

module.exports = app;



















// var socket = io.connect('http://localhost:3000');

// var username = "",
// 	someone = "",
// 	roomId = "";


// socket.on('userId', function(data){
// 	userId = data.userId;
// });
