// -----------------------------
// Vendors

var Marionette      = require('backbone.marionette');
var _               = require('underscore');
var $               = require('jquery');
var requestAgent    = require('superagent');



// -----------------------------
// Layouts

var Room = require("./views/room/room.js");
var Home = require("./views/home/home.js");



// -----------------------------
// Collections




// -----------------------------
// Locals

var Utils = require('./utils')();



// -----------------------------
// Core

module.exports = Marionette.Controller.extend({

	initialize: function(options) {
        // Debug
        console.info("Initializing Soundplace...");

        _.bindAll(this, "onStart");

        app = options.app;
	},

    onStart: function() {
        // Debug
        console.info("Intro controller");
        var that = this;
    },

    showHome: function() {
        // Debug
        console.log("HOME SWEET HOME");

    }

});
