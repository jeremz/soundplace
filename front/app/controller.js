// -----------------------------
// Vendors

var Marionette      = require('backbone.marionette');
var _               = require('underscore');
var $               = require('jquery');
var request         = require('superagent');



// -----------------------------
// Layouts

var MainLayout      = require("./layout/main.js");



// -----------------------------
// Views

var RoomView        = require("./views/room/room.js");
var HomeView        = require("./views/home/home.js");



// -----------------------------
// Collections




// -----------------------------
// Locals

var Utils   = require('./utils')();



// -----------------------------
// Core

module.exports = Marionette.Controller.extend({

	initialize: function(options) {
        // Debug
        console.info("Initializing Soundplace...");

        _.bindAll(this, "onStart", "showHome", "showRoom");

        this.app = options.app;

        this.layout = new MainLayout();
        this.app.mainContainer.show(this.layout);
	},

    onStart: function() {
        // Debug
        console.info("Intro controller");
        var that = this;
    },

    showHome: function() {
        // Debug
        console.log("HOME SWEET HOME");
        var that = this;

        var rooms;

        var onSuccess = function(){
            var page = new HomeView({rooms: rooms, app: that.app});
            that.layout.content.show(page);
        }

        // var data = {"roomLocation": {"latitude":48.8864273, "longitude":2.3151762}}; // Clint
        var data = {"roomLocation": {"latitude":48.8203119, "longitude":2.3750716}}; // P13
        // var data = {"roomLocation": this.app.gps.coords};
        request
            .post(Utils.api_host)
            .send(data)
            .end(function(err, res){
                rooms = res.body;
                console.log(rooms)
                onSuccess(rooms);
            })
    },

    showRoom: function(id) {
        var that = this;

        console.info("Layout Rooms");

        var onSuccess = function(){
            var page = new RoomView({room: room});
            that.layout.content.show(page);
        };

        request
            .get(Utils.api_host + "room/" + id)
            .end(function(err, res){
                room = res.body;
                onSuccess(room);
            });
    }
});
