let express = require('express');
let router = express.Router();

// define the home page route
router.get('/', function(req, res) {
  res.send('RSVPs default route');
});

module.exports = router;