var mongoose = require('mongoose');

var chatroom = {
	chatroom: {
		required:true,
		type:String
	},
	users: [],
	messages: []
};

var Chatroom = mongoose.model('Chatroom', chatroom);
module.exports = Chatroom;

