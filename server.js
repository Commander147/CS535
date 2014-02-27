var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

server.listen(3000);

var nodes = new Array();

app.get('/', function (req, res) {
	res.sendfile(__dirname + '/public/index.html');
});

io.sockets.on('connection', function (socket) {
	nodes.push(socket.id);
	socket.emit('send', JSON.stringify(nodes));
	socket.on('send message', function (data) {
		socket.emit('new message', data);
		console.log(data);
	});

	socket.on('disconnect', function () {
	 	var i = nodes.indexOf(socket.id);
		if(i != -1) {
			nodes.splice(i, 1);
		}
  	});

});

