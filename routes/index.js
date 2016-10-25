var express = require('express');
var router = express.Router();
var auth = require('../util/validate.js');
var blogDao = require('../dao/blogDao.js');



/* GET Type Blog List page. */
router.get('/:type', function(req, res, next) {
	var data = {
		type:req.params.type
	};
	blogDao.getBlogByType(data,function(err,rows){
		if(err){
			console.log(err);
			 res.render('index.ejs', {title: '获取失败' ,userid:req.session.userid});
		}else{
			if(rows.length){
				var blogTypeList = [];
				for (var i = rows.length - 1; i >= 0; i--) {
					blogTypeList.push(rows[i]) ;
				}
				res.render('index.ejs', {title: 'MicroBlog System' ,userid:req.session.userid,blogTypeList:blogTypeList});
			}else{
				res.render('index.ejs', {title: '该类型博客不存在！',userid:req.session.userid});
			}
		}
		
	});
   
});

/* GET Blog Content. */
router.get('/:type/:blogid', function(req, res, next) {
	var data = {
		id:req.params.blogid
	}
	blogDao.getBlogById(data,function(err,rows){
		if(err){
			console.log(err);
			 res.render('index.ejs', {title: '获取失败' ,userid:req.session.userid});
		}else{
			if(rows.length){
				res.render('blogdetail.ejs', {title: 'MicroBlog System' ,userid:req.session.userid,blogDetail:rows[0]});
			}else{
				res.render('blogdetail.ejs', {title: '该博客已经不存在！',userid:req.session.userid});
			}
		}
	});
});

module.exports = router;
