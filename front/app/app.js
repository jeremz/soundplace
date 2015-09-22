// Silence is golden
$ = require("jquery");
_ = require("underscore");
require("backbone");
require("backbone.marionette");
require("underscore");

Parse.initialize("aim3575s3Q2lOjFMrBTYkkTiQXf8jm9hHBm5Bi2I", "r4c63xZ7ZNX0gUTijmjGPCQ8nXu2axVimZvG8eME");

var socket = io.connect('http://localhost:3000');

require("./views/room/room.js");
require("./views/home/home.js")

var username = "",
	someone = "",
	roomId = "";

//-----------------------------------------------------------------------
//								  		REMPLISSAGE DOM AVEC VUE BACKBONE

// var AppView = Backbone.View.extend({
// 	tagName : "div",
// 	id: "view",

// 	initialize: function () {
// 		this.template = _.template(tplHome());
//         this.render().$el.appendTo("#app"); 
//     },
//     render:function(){
//     	this.$el.html(this.template());
//         return this;
//     },
//     renderHome:function(){
//     	this.template = _.template(tplRoom());
//         this.render().$el.appendTo("#app"); 
//     },
//     renderRoom:function(){
//     	this.template = _.template(tplRoom());
//         this.render().$el.appendTo("#app"); 
//         initRoom();
//     },
	
// });

var appView = new AppView();

//-----------------------------------------------------------------------
//															 TEST ROUTING

var router = Backbone.Router.extend({})
Backbone.history.start({pushState: true});

socket.on('userId', function(data){
	userId = data.userId;
});
