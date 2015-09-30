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

		Utils.routing.navigate('room', {trigger: true});

	}
})