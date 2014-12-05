var express = require('express');
var app = express();
var db = require('diskdb');
db = db.connect('collections', ['users','chatrooms']);

var http = require('http').Server(app);
var io = require('socket.io')(http);

http.listen(3000, function(){
			console.log('listening on *:3000');	
});
var user;
var channel;

io.on('connection', function(socket){
	console.log('user connected');
 socket.on('disconnect', function(socket){
				 
		db.users.remove(user);
		var chat = db.chatrooms.findOne({chatroom:channel});
		console.log(chat);
		var index = 0;
				for(var x=0; x< chat.users.length; x++){
			if(chat.users[x].nickname === user.nickname)
				 index = x;
			}
				console.log('index',index);
		if(index > 0){
		chat.users.substring(index, 1);
		}
		else{
			new Error({"error":"Your nickname is weird and caused an error. Thaaaanks."});
		}
		
  });
 socket.on('send message', function(datapacket, test){

				 console.log('SUCCESS!');
				 console.log('arguments:');
				 console.log(arguments);



	//	db.chatrooms.update({"chatroom":datapacket.chatroom}, {"messages":datapacket.messages});			 
 });
 socket.on('user', function(data){
			var theUser = db.users.find({"nickname":data.nickname});
			var theChat = db.chatrooms.findOne({"chatroom":data.chatroom});
			var isValid = false;
			channel = data.chatroom;

			if(theUser.length > 0){
				//console.log('FOUND THE USER', theUser);
						}
			else{
							isValid = true;
			//console.log('USER NOT FOUND! CONTINUE ON TO CHAT');
			var saveUser = {"nickname":data.nickname};
			user = saveUser;
			db.users.save(saveUser);
						
			
			}

 if(isValid){
 			if(theChat){
				theChat.users.push(user);

				var isValid = true;
				io.emit('enter', theChat, isValid);

			}
			else{

			  db.chatrooms.save({"chatroom":channel,
													"users": [user],
													"messages": [],
													"isValid":true});
				io.emit('enter', {"chatroom":channel,
													"users": [user],
													"messages": [],
								"isValid":true});
			}
 }
	else{
	io.emit('enter', {"isValid":false});
	}
 			
 });

	// if(db.users.findOne({
	// 	userid:
	// }))	
});

