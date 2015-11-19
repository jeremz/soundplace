// ---------------------------------------------------------------------
// 													 			   UTILS

var Utils = require('./../../utils')();



// ---------------------------------------------------------------------
// 													 			 VENDORS

var Marionette 	= require('backbone.marionette');
var $ 			= require('jquery');
var request		= require('superagent');
var _			= require('underscore');
var socket 		= io.connect(Utils.api_host);



// ---------------------------------------------------------------------
// 													 			  LAYOUT

var tpl = require("./home.hbs");

module.exports = Marionette.CompositeView.extend({

	template: tpl,
	tagName : "div",
	id: "home",

	events: {
		"click .submitCreateRoom" : "createRoom"
	},

	initialize: function(options){
		_.bindAll(this, "onShow", "createRoom");
		this.rooms = options.rooms;
		this.app = options.app;
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

		var that = this;

		var roomName = $(".createRoom").find("input[type='text']").val();

        // var roomLocation = {"roomLocation": {"latitude":48.8864273, "longitude":2.3151762}}; // Clint
        var roomLocation = {"roomLocation": {"latitude":48.8203119, "longitude":2.3750716}}; // P13
        // var roomLocation = {"roomLocation": this.app.gps.coords};

        request
            .post(Utils.api_host + "room")
            .send({"roomName": roomName, "roomLocation":roomLocation})
            .end(function(err, res){
                room = res.body;
                Utils.routing.navigate('room/' + room.objectId, {trigger: true});
            });
	}
})