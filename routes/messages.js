var express = require('express');
var router = express.Router();
var auth = require('../util/validate.js');
var messageDao = require('../dao/messageDao.js');
var userDao = require('../dao/userDao.js');

//新增留言
router.post('/add',function(req,res,next){
	userDao.getUserById({userid:req.session.userid},function(err,row){
		if(err){
			console.log(err);
			res.redirect('/index/'+req.body.blogtype+'/'+data.blogid);
		}else{
			var data = {
			blogid:req.body.blogid,
			parentid:'',
			username:row[0].username,
			userid:req.session.userid,
			content:req.body.blogcontent,
				createtime:new Date()
			}
			messageDao.addMessage(data,function(err,rows){
				if(err){
					console.log(err);
					res.redirect('/index/'+req.body.blogtype+'/'+data.blogid);
				}else{
					console.log(rows);
					res.redirect('/index/'+req.body.blogtype+'/'+data.blogid);
				}
			});
		}
	})
});

module.exports = router;