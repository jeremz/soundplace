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
		.post(home.create);


	// -----------------------------
	// ROOM

	router.route('/room')
		.post(room.create);

	router.route('/room/:id')
		.get(room.infos)

	router.route('/room/:id')
		.put(room.update)

}