// load mongoose since we need it to define a model
var mongoose = require('mongoose');

var Schema = mongoose.Schema;  

var userSchema = new Schema({
  twitter: {
    id: String,
    token: String,
    displayName: String,
    username: String
  },
  rsvps: Array
});

module.exports = mongoose.model('User', userSchema);