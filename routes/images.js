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
router.put('/user-favorited/:imageId', function(req, res) {
    var imageId = req.params.imageId;
    
    if(!req.user) {
        //console.log("NO USER DETECTED. Cannot favorite an image without logging in.");
        return;
    }
    
    var userId = req.user._id;  
    
    //console.log("User ID: ", userId);
    //console.log("Will see if userId is in this images favorites array. If not, will add it. If so, will remove it. Just toggles the favorites existence.");
    
    Image.findOne({'_id':imageId},function(err, image) {
        if(err) console.log('Err: ', err);
        
        //console.log("Image BEFORE: ", image);
        
        if(image.favorites) {
            //console.log("Favorites array exists... look for this user id in array. If found they've already favorited it before. User id: ", userId);
            
            var currentFavs = image.favorites;
            
            //console.log("Current favs: ", currentFavs);
            
            var locationOfThisElement = currentFavs.indexOf(userId);
            //console.log("Index of: ", locationOfThisElement);
            
            if(locationOfThisElement !== -1) {
               // console.log("This user has already favorited this image. They are now unfavoriting it, so remove from array");
                currentFavs.splice(locationOfThisElement, 1);
            } else {
                //console.log("User has not yet favorited this image, add to the array");
                currentFavs.push(userId);
            }
            
            image.favorites = currentFavs;
            image.favoriteCount = currentFavs.length;
            
            delete image._id;
            
            //console.log("New image object: ", image);
        
            Image.update({_id: imageId}, image, {upsert: true}, function (err, image) {
                if(err) console.log('Err: ', err);
            });             

        }
        
        return res.send(image);
    });      
});

module.exports = router;