// ---------------------------------------------------------------------
// 													 			 VENDORS
var io 			= require('./../io');
	Parse 		= require('parse/node');



// ---------------------------------------------------------------------
// 													 			   QUERY

exports.create = function(req, res, next){

	var roomName = req.body.roomName;

	var Rooms = Parse.Object.extend("Rooms");
	var rooms = new Rooms();
	rooms.save({'roomName': roomName, 'description':'', 'private':false }).then(function(object) {
  		roomId = object.id;
  		io.to('home').emit('newRoom', {roomName: roomName});
  		res.json(roomId)
  	});	
}

exports.infos = function(req, res, next){

	var roomId = req.params.id;
	var query = new Parse.Query("Rooms");
	query.get(roomId).then(function(results) {
		res.json(results);
	});
}