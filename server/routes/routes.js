var Parse = require('parse/node');

module.exports = function(app){



// ---------------------------------------------------------------------
// 																	HOME
    app.get('/', function(req, res){
        res.json({"test":"oklm"});
    });

    var query = new Parse.Query("Rooms");
	query.find({
		success: function(objectId) {
		    for (var i = 0; i < objectId.length; ++i) {
		      	console.log(objectId[i].get('creator'));
		    }
		},

		error: function(object, error) {
		    console.error("error");
		}
	});



// ---------------------------------------------------------------------
// 																	ROOM
    app.get('/room', function(req, res){
        res.send("oklm");
    });
}