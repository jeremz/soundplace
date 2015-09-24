// ---------------------------------------------------------------------
// 													 			 VENDORS
											 	     	
var Parse 		= require('parse/node');
var express 	= require('express');
var router 		= express.Router();



// ---------------------------------------------------------------------
// 													 	     CONTROLLERS

var home = require('../controllers/home');
var room = require('../controllers/room');



// ---------------------------------------------------------------------
// 																  ROUTES
module.exports = function(app){

	app.use('/', router);



	// -----------------------------
	// HOME

	router.route('/')
		.get(home.infos);



	// -----------------------------
	// ROOM

	router.route('/room')
		.get(room.create)
		.get(room.infos);

}