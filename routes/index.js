var express = require('express');
var router = express.Router();
var auth = require('../util/validate.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.ejs', {title: 'MicroBlog System' ,userid:req.session.userid});
});

module.exports = router;
