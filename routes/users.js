var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    name: "John",
    last: "Smith"
  });
});

router.get('/authenticated', function(req, res, next) {
  var authed = false;
  if (req.isAuthenticated()) {
    authed = true;
  }
  res.json({'authenticated': authed});
});    
    
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});    
    
router.get('/get-id-of-logged-in', function(req, res, next) {
  if (req.isAuthenticated()) {
    res.json({'user': req.user});
  } else {
    res.json({'userId': '-1'});
  }
}); 

module.exports = router;
