// make connection
var socket = io.connect('http://localhost:3000');

// Query DOM
var message = document.getElementById('message');
var handle = document.getElementById('handle');
var btn = document.getElementById('send');
var output = document.getElementById('output');
var feedback = document.getElementById('feedback');
var enternamebtn = document.getElementById('enternamebtn');
var entername = document.getElementById('entername');
var simplechatapp = document.getElementById('simplechatapp');

// emit evets

btn.addEventListener('click', function() {
	socket.emit('chat', {
		message: message.value,
		handle: handle.value,
		});
	window.scrollTo(0, document.body.scrollHeight);
});

message.addEventListener('keypress', function() {
	socket.emit('typing', handle.value);
})



// listen for events

socket.on('chat', function(data){
	feedback.innerHTML = "";
	message.value = "";
	output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
})

socket.on('typing', function(data){
	feedback.innerHTML = "<p><em>" + data + " is typing...</em></p>";
})

// Design events

enternamebtn.addEventListener('click', function() {
	entername.style = "display: none";
	simplechatapp.style = "display: inline";

})