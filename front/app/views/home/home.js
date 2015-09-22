// -----------------------------
// Vendors

var Marionette 	= require('backbone.marionette');
var $ 			= require('jquery');



// -----------------------------
// Utils

// var Utils = require('../utils')();



// -----------------------------
// Layouts

var tplHome = require("./home.hbs");

module.exports = Marionette.CompositeView.extend({

	tagName : "div",
	id: "home",

	events: {
		"click .createRoom" : "createRoom"
	},

	initialize: function(){

	},

	onShow: function(){
		console.log("dsfsdfs");
	},

	createRoom: function(){
		e.preventDefault();
		roomName = $(".createRoom").find("input").val();
		var Rooms = Parse.Object.extend("Rooms");
		var rooms = new Rooms();
		// rooms.save({room: roomName, creator: userId}).then(function(object) {
	 //  		roomId = object.id;
	 //  		router = new Backbone.Router();
		// 	router.navigate("room/"+roomId);
		// 	appView.remove();
		// 	appView.renderRoom();
	 //  	});	
	}
})