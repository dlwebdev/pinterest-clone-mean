// load mongoose since we need it to define a model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;  

var imageSchema = new Schema({
  favoriteCount: Number,
  text: String,
  imgUrl: String,
  username: String,
  userIcon: String
});

module.exports = mongoose.model('Image', imageSchema);