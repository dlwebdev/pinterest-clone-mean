// load mongoose since we need it to define a model
var mongoose = require('mongoose');

var Schema = mongoose.Schema;  

var userSchema = new Schema({
  username: String,
  twitter: {
    id: String,
    token: String,
    displayName: String,
    username: String
  }
});

module.exports = mongoose.model('User', userSchema);