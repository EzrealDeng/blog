var express = require('express');
var router = express.Router();
var userDao = require('../dao/userDao.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.render('login.ejs',{title:'Login'});
});

//register
router.get('/register', function(req, res, next) {
 	res.render('register.ejs',{
 		title:'Register'
 	});
});

router.post('/register', function(req, res, next) {
 	if(req.body.password != req.body.confirmPassword){
        res.render('register.ejs',{title:'Error',error:'两次密码不一致！'});
        return;
    }
  var data = {
  	username : req.body.username,
  	password : req.body.password,
  	email:req.body.email,
  	confirmPassword : req.body.confirmPassword
  }
  userDao.insertUser(data,function(err,rows){
  	if(err){
  		console.log(err);
  	}else{
  		console.log(rows);
  	}
  	res.redirect('login');
  })
  return;
});

//login
router.get('/login', function(req, res, next) {
 	res.render('login.ejs',{title:'Login'});
  	return;
});

router.post('/login', function(req, res, next) {
	var data = {
		username:req.body.username,
		password:req.body.password
	};
	userDao.getUserByNameAndPwd(data,function(err,rows){
		if(err){
			console.log('登录失败，验证密码过程出错');
		}else{
			console.log(rows);
			if(rows.length >= 1){
				req.session.userid = rows[0].uid;
				res.redirect('/index/5');
			}else{
				res.render('login.ejs',{title:'Index',error:'用户名或密码错误'});
			}
		}
	});
  return;
});

//logout
router.get('/logout', function(req, res, next) {
	req.session.userid = null;
 	res.render('login.ejs',{title:'Index'});
});

module.exports = router;
