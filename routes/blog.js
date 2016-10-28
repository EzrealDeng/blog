var express = require('express');
var router = express.Router();
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
			res.render('bloglist.ejs', {title: '我的微博',userid:req.session.userid,bloglist:bloglist,isWriteShow:1});
		}
	})
});

//新增微博
router.post('/addBlog',function(req,res,next){
	var uname = '';
	userDao.getUserById({userid:req.session.userid},function(err,rows){
		if(err){
			console.log("addBlog Err" + err);
			res.render('bloglist.ejs',{title:"我的微博",userid:req.session.userid,isWriteShow:1});
			return;
		}else{
			uname = rows[0].username;
		}
		insertBegin(req,res,uname);
	})
	
})

//根据ID获取Blog
router.get('/:id', function(req, res, next) {
	var data = {
		id:req.params.id
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

//删除博客
router.get('/remove/:blogid',function(req,res,next){
	var data = {
		id:req.params.blogid
	}
	blogDao.removeBlogByID(data,function(err,rows){
		if(err){
			console.log(err);
		}else{
			console.log('remove success');
			res.redirect('/blog');
		}
	})
});

//编辑博客
router.get('/edit/:blogid',function(req,res,next){
	var data = {
		id:req.params.blogid
	}
	blogDao.getBlogById(data,function(err,rows){
		if(err){
			console.log(err);
			 res.render('blogEdit.ejs', {title: '获取失败' ,userid:req.session.userid});
		}else{
			if(rows.length){
				console.log(JSON.stringify(rows));
				res.render('blogEdit.ejs', {title: 'MicroBlog System' ,userid:req.session.userid,blogDetail:rows[0]});
			}else{
				res.render('blogEdit.ejs', {title: '该博客已经不存在！',userid:req.session.userid});
			}
		}
	});
});

//编辑博客
router.post('/edit/:blogid',function(req,res,next){
	var data = {
			id:req.params.blogid,
			content:req.body.content,
			title:req.body.title,
			description:req.body.description,
			type:req.body.type
		}
	blogDao.updateBlogByID(data,function(err,rows){
		if(err){
			console.log(err);
		}else{
			console.log('Edit success');
			console.log(rows);
			//res.render('blogEdit.ejs', {title: '修改成功！',userid:req.session.userid,blogDetail:rows[0]});
			blogDao.getBlogById({id:req.params.blogid},function(err,lines){
				if(err){
					console.log(err);
				}else{
					res.render('blogdetail.ejs', {title: '修改成功' ,userid:req.session.userid,blogDetail:lines[0],message:"修改成功"});
				}
			})
			
		}
	});
});



//执行插入操作
function insertBegin(req,res,uname){
	var time = new Date();
	var data = {
		userid:req.session.userid,
		username:uname,
		content:req.body.content,
		createtime:time,
		title:req.body.title,
		description:req.body.description,
		type:req.body.type
	}

	blogDao.addBlog(data,function(err,rows){
		if(err){
			console.log(err);
			res.redirect('/blog');
		}else{
			console.log(rows);
			res.redirect('/blog');
		}
	});

	return
}

module.exports = router;