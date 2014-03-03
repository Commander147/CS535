var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	nicknames = [];
	
server.listen(3000);

app.get('/', function(req, res){
	res.sendfile(__dirname + '/index.html');
});

//parallel section
var numNode = 10;
var total_time = numNode * 100000;

io.sockets.on('connection', function(socket){
	socket.on('new user', function(data, callback){
		if (nicknames.indexOf(data) != -1){
			callback(false);
		} else{
			callback(true);
			socket.nickname = data;
			nicknames.push(socket.nickname);
			updateNicknames();
			io.sockets.emit('userlogin',nicknames.length);

		}
	});

	socket.on('update time', function(data){
		io.sockets.emit('time',data);
	});	

	function updateNicknames(){
		io.sockets.emit('usernames', nicknames);
	}

	socket.on('send message', function(data){
		io.sockets.emit('new message', {msg: data, nick: socket.nickname});
	});
	
	socket.on('disconnect', function(data){
		if(!socket.nickname) return;
		io.sockets.emit('userlogout',nicknames.indexOf(socket.nickname));
		nicknames.splice(nicknames.indexOf(socket.nickname), 1);
		updateNicknames();
	});
});
