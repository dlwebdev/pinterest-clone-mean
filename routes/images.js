var express = require('express');
var router = express.Router();

var Image = require('../server/models/image');

// define the home page route
router.get('/', function(req, res) {
    Image.find({}, function (err, images) {
        if(err) console.log('Err: ', err);
        res.json(images);
    }); 
});

router.get('/currentuser/', function(req, res) {
    var username = req.user.twitter.username;
    
    Image.find({'username': username},function(err, images) {
        if(err) console.log('Err: ', err);
        res.json(images);
    }); 
});

router.delete('/:id', function(req, res) {
    var id = req.params.id;
    
    Image.remove({'_id': id},function(result) {
        res.json(result);
    });    
});

router.post('/', function(req, res) {
    // Create a new image

    var image = new Image({
      text: req.body.text,
      imgUrl: req.body.imgUrl,
      username: req.body.username,
      userIcon: req.body.userIcon,
      favoriteCount: req.body.favoriteCount
    });

    image.save(function (err, image) {
      if (err) { 
        console.log('error saving image: ', err);
      }
      res.status(201).json(image);
    });

});

router.get('/:id', function(req, res) {
    var id = req.params.id;
    
    Image.findOne({'_id':id},function(err, result) {
        if(err) console.log('Err: ', err);
        return res.send(result);
    });             
});

// toggle-favorite will look for the id of the image passed. If it already exists in the favorites array, it will remove it, otherwise it will add it
router.put('/user-favorited/:id', function(req, res) {
    var imageId = req.params.id;
    var userId = req.body.userId;    

    console.log("Will see if userId is in this images favorites array. If not, will add it. If so, will remove it. Just toggles the favorites existence.");
    
    Image.findOne({'_id':imageId},function(err, image) {
        if(err) console.log('Err: ', err);
        
        if(image.favorites) {
            console.log("Favorites array exists... look for this user id in array. If found they've already favorited it before. User id: ", userId);
        }
        
        return res.send(image);
    });      
});

module.exports = router;