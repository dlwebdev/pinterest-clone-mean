// load mongoose since we need it to define a model
var mongoose = require('mongoose');

var Schema = mongoose.Schema;  

var rsvpSchema = new Schema({
  bar: String,
  numberAttending: Number,
  dateAdded: String
});

module.exports = mongoose.model('Rsvp', rsvpSchema);