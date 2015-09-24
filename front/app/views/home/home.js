// -----------------------------
// Utils

var Utils = require('./../../utils')();



// -----------------------------
// Vendors

var Marionette 	= require('backbone.marionette');
var $ 			= require('jquery');
var request		= require('superagent');
var socket 		= io.connect(Utils.api_host);




// -----------------------------
// Layouts

var tpl = require("./home.hbs");

module.exports = Marionette.CompositeView.extend({

	template: tpl,
	tagName : "div",
	id: "home",

	events: {
		"click .submitCreateRoom" : "createRoom"
	},

	initialize: function(){

	},

	onShow: function(){
		socket.on('newRoom', function (data){
			roomName = data.roomName;
			$(".rooms").find("ul").append(roomName);
		})
	},

	createRoom: function(e){
		e.preventDefault();

		roomName = $(".createRoom").find("input[type='text']").val();

		request
			.post(Utils.api_host + "room")
			.send({"roomName": roomName})
			.end(function(err, res){
				roomId = res.body;
			})



	}
})