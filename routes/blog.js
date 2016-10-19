var express = require('express');
var router = express.Router();
var fs = require('fs');
var auth = require('../util/validate.js');
var userDao = require('../dao/userDao.js');
var blogDao = require('../dao/blogDao.js');


//微博内容列表
router.get('/', function(req, res, next) {
	//获取数据库微博列表并在前端展示
	blogDao.getBlogList(function(err,rows){
		var bloglist = [];
		if (err) {
			console.log(err);
		} else {
			for (var i = 0; i < rows.length; i++) {
				bloglist.push({
					username:rows[i].username,
					content:rows[i].content,
					createtime:rows[i].createtime
				});
			}
			res.render('bloglist.ejs', {title: '我的微博',userid:req.session.userid,bloglist:bloglist});
		}
	})
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
		}else{
			console.log(rows);
			res.redirect('/blog');
		}
	});

	return
}

module.exports = router;