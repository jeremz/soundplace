
//On recupere l'id User que l'on stock dans une var userId





//On stock le nom d'un autre user
socket.on('newName', function (data) {
	someone = data.username.username;
	$("#user").find("ul").append("<li>"+someone+"</li>")
});
