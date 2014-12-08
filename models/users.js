var mongoose = require('mongoose');

var users = {
	nickname: String
};

var User = mongoose.model('User', users);
module.exports = User;
