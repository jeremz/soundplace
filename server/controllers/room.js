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
  		io.socket.join(roomId);
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
exports.update = function(req, res, next){
	var roomId = req.params.id;
	var roomName = req.body.roomName;
	var roomPrivate = JSON.parse(req.body.roomPrivate);
	var roomDescription = req.body.roomDescription;
	var data = {};

	var Rooms = Parse.Object.extend("Rooms");
	var rooms = new Rooms();

	rooms.id = roomId;

	if(typeof roomPrivate != 'undefined'){
		data.roomPrivate = roomPrivate;
	}
	if(typeof roomName != 'undefined'){
		data.roomName = roomName;
	}
	if(typeof roomDescription != 'undefined'){
		data.description = roomDescription;
	}

	rooms.save(data).then(function(object) {

		io.to(roomId).emit('roomUpdate', {room: object});
		io.to('home').emit('roomUpdate', {room: object});
	});
}