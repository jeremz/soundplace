// -----------------------------
// Vendors

var Marionette      = require('backbone.marionette');
var _               = require('underscore');
var $               = require('jquery');
var requestAgent    = require('superagent');



// -----------------------------
// Layouts

var MainLayout      = require("./layouts/main.js");



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

        _.bindAll(this, "onStart", "showHome");

        this.app = options.app;
        console.log(this.app);

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

        var page = new HomeView();
        that.layout.content.show(page);
    }

});
