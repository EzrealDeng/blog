var express = require('express');
var router = express.Router();
var auth = require('../util/validate.js');
var blogDao = require('../dao/blogDao.js');

/* GET home page. */
router.get('/', function(req, res, next) {
	var data = {
		id:60
	}
	blogDao.getBlogById(data,function(err,rows){
		if(err){
			console.log(err);
			 res.render('index.ejs', {title: '获取失败' ,userid:req.session.userid});
		}else{
			if(rows.length){
				res.render('index.ejs', {title: 'MicroBlog System' ,userid:req.session.userid,blogDetail:rows[0]});
			}else{
				res.render('index.ejs', {title: '该博客已经不存在！',userid:req.session.userid});
			}
		}
	});
 
});

module.exports = router;
