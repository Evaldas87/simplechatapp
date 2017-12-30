// make connection
var socket = io.connect();

// Query DOM
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');
var enternamebtn = document.getElementById('enternamebtn');
var entername = document.getElementById('entername');
var simplechatapp = document.getElementById('simplechatapp');
var users = document.getElementById('users');

// emit evets

btn.addEventListener('click', function() {
	socket.emit('chat', {
		message: message.value,
		handle: handle.value,
		});
	window.scrollTo(0, document.body.scrollHeight);
	message.value = "";
});

message.addEventListener('keypress', function() {
	socket.emit('typing', handle.value);
})


// listen for events

socket.on('chat', function(data){
	feedback.innerHTML = "";
	output.innerHTML += '<p><strong>' + data.handle + '> </strong>' + data.message + '</p>';
})

socket.on('typing', function(data){
	feedback.innerHTML = "<p><em>" + data + " is typing...</em></p>";
})

socket.on('users', function(data){
	var names = '';
	for (var i = 0; i < data.length; i++) {
		names += "<li>" + data[i] + "</li>";
	}
	users.innerHTML = names;
})


// Design events

enternamebtn.addEventListener('click', function() {
	entername.style = "display: none";
	simplechatapp.style = "display: inline";
	socket.emit('new user', handle.value, function(data){
	});
})