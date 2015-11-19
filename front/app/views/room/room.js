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

		this.room = options.room;
    },
    serializeData: function(){
    	return {
    		room: this.room
    	}
    },
    onShow: function(){
		var that = this;
		
		console.log(that.room);

	},
	login: function(e){
		e.preventDefault();
		console.log("coucouille");
	}
})