// ---------------------------------------------------------------------
// 													 			 VENDORS
var io 			= require('./../io');
	Parse 		= require('parse/node');



// ---------------------------------------------------------------------
// 													 			   QUERY

exports.create = function(req, res, next){

	var roomName = req.body.roomName;
	var roomLocation = req.body.roomLocation;
	var data = {};

	data.roomName = roomName;
	data.description = '';
	data.private = false;

	if(!isNaN(roomLocation.latitude) && typeof roomLocation.latitude == "number"){
		var point = new Parse.GeoPoint(roomLocation);
		data.location = point;
	}

	var Rooms = Parse.Object.extend("Rooms");
	var rooms = new Rooms();
	
	rooms.save(data).then(function(object) {
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