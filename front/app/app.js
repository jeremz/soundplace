// -----------------------------
// Vendors

var $ 			= require('jquery'),
	Backbone 	= require('backbone'),
	Marionette 	= require('backbone.marionette');

var Controller  = require('./controller');
var Router 		= require('./router');



// -----------------------------
// Utils

var Utils = require("./utils")();




// -----------------------------
// Core

var app = new Marionette.Application({
	container: 'body',

	navigate: function(e){
		
    },
});

app.addRegions({
	mainContainer: app.container
});

app.on("start", function(){
	new Router({
		controller: controller
	});

	Parse.initialize("aim3575s3Q2lOjFMrBTYkkTiQXf8jm9hHBm5Bi2I", "r4c63xZ7ZNX0gUTijmjGPCQ8nXu2axVimZvG8eME");
	app.socket = io.connect(Utils.api_host);

    // Get GPS
 	navigator.geolocation.getCurrentPosition(function(position){
		app.gps = position;
	}, function(error){
		console.error(error);
	});

	// Start history
	Backbone.history.start();
});

var controller = new Controller({app: app});

app.start();

module.exports = app;



