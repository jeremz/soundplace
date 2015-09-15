var socket = io.connect('http://localhost:3000');

var name = "",
	someone = "";

// Au click on stock son nom et on envoie au serveur
$('#search-button').click(function(){
	name = $("input").val();
	$("#user").find("ul").prepend("<li>"+name+"</li>")
	socket.emit('name', {name:name});
})

//On stock le nom d'un autre user
socket.on('newName', function (data) {
	someone = data.name.name;
	$("#user").find("ul").append("<li>"+someone+"</li>")
});