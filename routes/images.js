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

router.post('/', function(req, res) {
    // Create a new image

    var image = new Image({
      text: req.body.text,
      imgUrl: req.body.imgUrl,
      username: req.body.username,
      userIcon: req.body.userIcon,
      favoriteCount: req.body.favoriteCount
    });
    
    console.log('Saving image: ', image);

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

module.exports = router;