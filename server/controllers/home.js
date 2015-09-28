// ---------------------------------------------------------------------
// 													 			 VENDORS

var Parse 		= require('parse/node');



// ---------------------------------------------------------------------
// 													 			   QUERY

exports.create = function(req, res, next){

	var roomLocation = req.body.roomLocation;

	var query = new Parse.Query("Rooms");

	if(!isNaN(roomLocation.latitude) && typeof roomLocation.latitude == "number"){
		query.near("location", roomLocation);
		query.limit(20);
		query.find().then(function(results){
			res.send(results)
		});
	}
	else{
		query.descending("createdAt");
		query.limit(20);
		query.find().then(function(results){
			res.send(results)
		});
	}
};