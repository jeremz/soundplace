// ---------------------------------------------------------------------
// 													 			 VENDORS

var Parse 		= require('parse/node');



// ---------------------------------------------------------------------
// 													 			   QUERY

exports.infos = function(req, res, next){

   	var query = new Parse.Query("Rooms");
	query.find().then(function(results) {
		res.json(results);
	});

};