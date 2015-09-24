// -----------------------------
// Vendors

var Marionette 	= require('backbone.marionette');
var $ 			= require('jquery');
var request		= require('superagent');
// var io			= require('socket.io');



// -----------------------------
// Utils

var Utils = require('./../../utils')();



// -----------------------------
// Layouts

var tpl = require("./home.hbs");

module.exports = Marionette.CompositeView.extend({

	template: tpl,
	tagName : "div",
	id: "home",

	events: {
		"click .createRoom" : "createRoom"
	},

	initialize: function(){

	},

	onShow: function(){

	},

	createRoom: function(){
		e.preventDefault();

		superagent
			.post(Utils.api_host + "room")
			.send({"some": "data"})
			.end(function(err, res){
				console.log(err);
				console.log(res);
			})


		// roomName = $(".createRoom").find("input").val();
		// var Rooms = Parse.Object.extend("Rooms");
		// var rooms = new Rooms();
		// rooms.save({room: roomName, creator: userId}).then(function(object) {
	 //  		roomId = object.id;
	 //  		router = new Backbone.Router();
		// 	router.navigate("room/"+roomId);
		// 	appView.remove();
		// 	appView.renderRoom();
	 //  	});	
	}
})