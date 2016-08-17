var express = require('express');
var router = express.Router();
var moment = require('moment');

var Rsvp = require('../server/models/rsvp');

// define the home page route
router.get('/', function(req, res) {
    Rsvp.find({}, function (err, rsvps) {
        if(err) console.log('Err: ', err);
        res.json(rsvps);
    }); 
});

  router.get('/:barId', function(req, res) {
    // Create a new rsvp
    
    //console.log('Remove RSVPs with dateAdded older than 2 days ago to keep data small.');
    
    var currentDate = moment().format('MM-DD-YYYY');
    var existingBar;
    var barHasPreviousRsvpToday = false;
    var barId = req.params.barId;
    
    //console.log('Checking if there is an RSVP TODAY for bar with id of: ', barId);
    //console.log('CURRENT DATE: ', currentDate);
    
    Rsvp.find({bar: barId, dateAdded: currentDate}, function (err, bar) {
      //console.log('Found bar with previous RSVP for today. Bar ID: ', bar);
      if(err) console.log('Err: ', err);
      if(bar) {
        existingBar = bar[0]; 
      }
    }).then(function(){    
      //console.log('Working with Bar RSVP of: ', existingBar);

      if(existingBar) {
        //console.log("TRUE");
          barHasPreviousRsvpToday = true;
      }

      if(barHasPreviousRsvpToday) {
        //console.log('WILL UPDATE Bar: ', existingBar);
        
        var numAttending = 0 + existingBar.numberAttending;
        existingBar.numberAttending = numAttending + 1;
      
        Rsvp.update({_id: existingBar.id}, existingBar, {upsert: true}, function (err, obj) {
            if(err) console.log('Err: ', err);
            //console.log('UPDATED SUCCESSFULLY!');
            res.status(201).json(existingBar);
        });     
        
      } else {
        //console.log('WILL CREATE NEW RSVP for this bar.');
      
        var rsvp = new Rsvp({
          bar: req.params.barId,
          numberAttending: 1,
          dateAdded: currentDate
        });
    
        rsvp.save(function (err, rsvp) {
          if (err) { 
            console.log('error saving rsvp: ', err);
          }
          res.status(201).json(rsvp);
        });   
      }
      
    }); 

  });  
  
  // Endpoint to cancel a rsvp. Just decrements the numberAttending count for this bar on this day
  router.get('/cancel/:barId', function(req, res) {
    // USER HAS TO BE LOGGED IN
    //console.log('Remove RSVPs with dateAdded older than 2 days ago to keep data small.');
    
    var currentDate = moment().format('MM-DD-YYYY');
    var existingBar;
    var barHasPreviousRsvpToday = false;
    var barId = req.params.barId;
    
    Rsvp.find({bar: barId, dateAdded: currentDate}, function (err, bar) {
        if(err) console.log('Err: ', err);
        //console.log('Found bar with previous RSVP for today. Bar ID: ', bar.bar);
      
        barHasPreviousRsvpToday = true;
        existingBar = bar[0];
    }).then(function(){    
      //console.log('Working with Bar RSVP of: ', existingBar);

      if(barHasPreviousRsvpToday) {
        //console.log('WILL UPDATE');
        
        var numAttending = 0 + existingBar.numberAttending;
        existingBar.numberAttending = numAttending - 1;
      
        Rsvp.update({_id: existingBar.id}, existingBar, {upsert: true}, function (err, obj) {
            if(err) console.log('Err: ', err);
            //console.log('UPDATED SUCCESSFULLY!');
            res.status(201).json(existingBar);
        });     
        
      } else {
        console.log('A bar should exist for cancelling an RSVP.');
      }
      
    }); 

  });  



module.exports = router;