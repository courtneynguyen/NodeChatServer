var express = require('express');
var app = express();
var config = require('./config'),
		mongoose = require('mongoose'),
		Users = require('./models/users.js'),
		Chatrooms = require('./models/chatrooms.js');

var db = mongoose.connect('mongodb://'+config.hostname+config.db);
var http = require('http').Server(app);
var io = require('socket.io')(http);
var user, channel;

http.listen(3000, function(){
				console.log('listening on *:3000');	
});

var online = [];
io.on('connection', function(socket){
				console.log('user connected');

				socket.on('join room', function(data){
								console.log('WHAT IS room ID??', data.room);
								socket.join(data.room);
								if(online.indexOf(data.nickname) < 1){
												var created = new Date();
								socket.emit('joining user', data);

								socket.to(data.room).emit('receive message',{"user":data.nickname,"msg":" has joined the room.", "created":created} );


								socket.user = data.nickname;
								socket.room = data.room;
								
								online.push(data.nickname);
								}
								else{
									socket.emit('joining user', false);
								}

				});
				socket.on('joined', function(){
								var created = new Date();
								socket.emit('setup chatroom', {"room":socket.room}, socket.user);				
			socket.to(socket.room).emit('receive message', {"user":socket.user,"msg":" has joined the room.", "created":created});	
				});
				socket.on('loading room', function(){
								console.log('channel is '+socket.room);
								socket.emit('setup chatroom', {"room":socket.room}, data.nickname);
				});
				socket.on('disconnect', function(){
								console.log('USER DISCONNECTED',socket.user);
								var created = new Date();
								socket.to(socket.room).emit('receive message', {"user":socket.user,"msg":" has left the room.", "created":created});
				});
				socket.on('send message', function(message){

								var created = new Date();
								socket.to(socket.room).emit('receive message', {"user":socket.user,"msg":message,"created":created});

				});

});

