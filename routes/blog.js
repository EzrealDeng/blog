var express = require('express');
var router = express.Router();
var auth = require('../util/validate.js');
var userDao = require('../dao/userDao.js');
var blogDao = require('../dao/blogDao.js');


//微博内容列表
router.get('/', function(req, res, next) {
	auth.isLogin(req,res,next);
	console.log(req.session.userid);
  res.render('bloglist.ejs', {title: '我的微博',userid:req.session.userid});
});


//新增微博
router.post('/addBlog',function(req,res,next){
	var uname = '';
	userDao.getUserById({userid:req.session.userid},function(err,rows){
		if(err){
			console.log(err);
			res.render('bloglist.ejs',{title:"我的微博",userid:req.session.userid});
			return;
		}else{
			console.log(rows[0].username + "**********************");
			uname = rows[0].username;
		}

		insertBegin(req,res,uname);
	})
	
})

//执行插入操作
function insertBegin(req,res,uname){
	var time = new Date();
	var data = {
		userid:req.session.userid,
		username:uname,
		content:req.body.content,
		createtime:time
	}
	console.log(data.userid,data.userid,data.content,data.username);
	blogDao.addBlog(data,function(err,rows){
		if(err){
			console.log(err);
			res.render('bloglist.ejs',{title:"我的微博",userid:req.session.userid});
		}else{
			console.log(rows);
			res.render('bloglist.ejs',{title:"我的微博",userid:req.session.userid});
		}
	});
}
module.exports = router;