var socket = io.connect('http://localhost:3000');

var username = "",
	someone = "",
	roomId = "";

//-----------------------------------------------------------------------
//								  		REMPLISSAGE DOM AVEC VUE BACKBONE

var AppView = Backbone.View.extend({
	el: '#app',

	render: function(){
		// console.log(this.el);
		this.$el.html(tplHome())
	}
});
var appView = new AppView({});
appView.render();

//-----------------------------------------------------------------------
//															 TEST ROUTING


// var router = Backbone.Router.extend({})
// Backbone.history.start({pushState: true});

// var Test = Backbone.Model.extend({})
// var test = new Test({description:"yolo Sewaggy"})
// lol = test.get('description');


//-----------------------------------------------------------------------
//														   ESSAI BACKBONE

//On recupere l'id User que l'on stock dans une var userId
socket.on('userId', function(data){
	userId = data.userId;
    console.log(userId);
});

//On capte l'envoie du form et on stock les infos dans parse (roomName et userId)
$('.createRoom').submit(function(e){
	e.preventDefault();
	roomName = $(".createRoom").find("input").val();

	var Rooms = Parse.Object.extend("Rooms");
	var rooms = new Rooms();
	rooms.save({room: roomName, creator: userId}).then(function(object) {
  		roomId = object.id;

//-----------------------------------------------------------------------
//														    TEST BACKBONE
  		router = new Backbone.Router({  
		  routes: {
		  	"": "home",
		    "room/:id": "room",
		    "place": "place",
		    "*r": "_notFound"
		  },
		  start:function(){
			Backbone.history.start({pushState: true});
		  },
		  room: function(id) {
		    console.log("room/"+id);
		    
		  },
		  place: function(){
		  	console.log("place");
		  },
		  _notFound: function(){
		  	console.log("not found");
		  },
		  home: function(){
		  	console.log("index");
		  }

		});

		
		router.navigate("room/"+roomId);

  		//TODO REDIRECT BACKBONE
  	});	
})

// Au submit du pseudo on stock son nom et on envoie au serveur
$('.loginForm').submit(function(e){
	var Rooms = Parse.Object.extend("Rooms");
	var query = new Parse.Query(Rooms);
	console.log(userId)
	query.equalTo("creator", userId);
	query.find({
	  success: function(results) {
	    console.log(results.length)
	  },
	  error: function(error) {
	    alert("Error: " + error.code + " " + error.message);
	  }
	});

	e.preventDefault();
	username = $("input[type='text']").val();
	
	var Users = Parse.Object.extend("Users");
	var users = new Users();
	users.save({userId: userId, username: username}).then(function(object) {
		$(".loginForm").css({"display":"none"});
		$(".participants").find("ul").prepend("<li>"+username+"</li>")
		socket.emit('roomCreate', {roomId:roomId});
	});
})

//On stock le nom d'un autre user
socket.on('newName', function (data) {
	someone = data.username.username;
	$("#user").find("ul").append("<li>"+someone+"</li>")
});
