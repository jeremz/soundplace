// -----------------------------
// Utils

var Utils = require('./../../utils')();



// -----------------------------
// Vendors

var Marionette 	= require('backbone.marionette');
var $ 			= require('jquery');
var request		= require('superagent');
var _			= require('underscore');
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

	initialize: function(options){
		_.bindAll(this, "onShow");
		this.rooms = options.rooms;
	},

	onShow: function(){
		var that = this;

		$.each(that.rooms, function(i, el){
			$(".rooms").find("ul").append("<li>" + el.roomName + "</li>");
		})

		socket.on('newRoom', function (data){
			roomName = data.roomName;
			$(".rooms").find("ul").append("<li>" + roomName + "</li>");
		});
	},

	createRoom: function(e){
		e.preventDefault();

		var roomName = $(".createRoom").find("input[type='text']").val(),
			roomLocation = {"latitude":48.8864273, "longitude":2.3151762}

		request
			.post(Utils.api_host + "room")
			.send({"roomName": roomName, "roomLocation":roomLocation})
			.end(function(err, res){
				roomId = res.body;
			})
	}
})