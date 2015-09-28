// ---------------------------------------------------------------------
// 													 			 VENDORS

var Parse 		= require('parse/node');



// ---------------------------------------------------------------------
// 													 			  LOCALS

var limit 		= 20;
var trier;



// ---------------------------------------------------------------------
// 													 			   QUERY

exports.create = function(req, res, next){

	var roomLocation = req.body.roomLocation;

	var query = new Parse.Query("Rooms");


	// -----------------------------
	// If User have a location
	if(!isNaN(roomLocation.latitude) && typeof roomLocation.latitude == "number"){

		var getMore = function(reste){
			query = new Parse.Query("Rooms");
			query.descending("createdAt");
			query.equalTo("location", null);
			query.limit(reste);
			query.find().then(function(addResults){
				Array.prototype.push.apply(trier, addResults);
				res.send(trier);
			});
		}

		query.near("location", roomLocation);
		query.limit(limit);
		query.find().then(function(results){
			trier = results;
			
			if(limit - results.length != 0){
				getMore(limit - results.length);
			};
		});
			
	}
	else{
		query.descending("createdAt");
		query.limit(limit);
		query.find().then(function(results){
			res.send(results)
		});
	}
};