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

var tpl = require("./room.hbs");

module.exports = Marionette.CompositeView.extend({

	template: tpl,
	tagName : "div",
	id: "room",

	events: {
		"click .loginForm" : "login"
	},

	initialize: function (options) {
		_.bindAll(this, "onShow", "login");
		this.rooms = options.rooms;
		this.app = options.app;
    },
    onShow: function(){
		var that = this;

		$.each(that.rooms, function(i, el){
			$(".participants").find("ul").append("<li>" + el.roomName + "</li>");
		})

		socket.on('newRoom', function (data){
			roomName = data.roomName;
			$(".participants").find("ul").append("<li>" + roomName + "</li>");
		});
	},
	login: function(){
		e.preventDefault();
		console.log("coucouille");
	}
})