var app = require('express')();
var io = require('socket.io').listen(app.listen(3000));

var nodes = new Array();

app.get('/', function (req, res) {
	res.sendfile(__dirname + '/public/index.html');
});

io.sockets.on('connection', function (socket) {
	nodes.push(socket.id);
	socket.emit('news', JSON.stringify(nodes));
	socket.on('my other event', function (data) {
		console.log(data);
	});

	socket.on('disconnect', function () {
	 	var i = nodes.indexOf(socket.id);
		if(i != -1) {
			nodes.splice(i, 1);
		}
  	});

});

