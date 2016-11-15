var express = require('express');
var router = express.Router();
var userDao = require('../dao/userDao.js');
var util = require('../util/validate.js');
var randomCode = '';//验证码
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
        res.render('register.ejs',{title:'注册',error:'两次密码不一致！'});
        return;
    }
  var data = {
  	username : req.body.username,
  	password : req.body.password,
  	email:req.body.email,
  	confirmPassword : req.body.confirmPassword
  }
  userDao.getUserList(function(err,rows){
    if(err){
      console.log(err);
       res.render('index.ejs', {title: '获取失败' ,userid:req.session.userid});
    }else{
      for(var i in rows){
        if(rows[i].username == data.username){
          console.log("user exists !");
          res.render('register.ejs',{title:'Error',error:'用户已存在！'});
          return
        }
      }
     userDao.insertUser(data,function(err,rows){
        if(err){
          console.log(err);
        }else{
          console.log(rows);
        }
        res.render('login.ejs',{title:'Index',error:'注册成功，请登录！'});
      })
      return 
    }
    
  });
  return;
});

//login
router.get('/login', function(req, res, next) {
  randomCode = util.getRandomCode();
  console.log(randomCode);
 	res.render('login.ejs',{title:'Login',valicode:randomCode});
});

router.post('/login', function(req, res, next) {
  if(req.body.valicode.toUpperCase() != randomCode){
    //重新生成验证码
    randomCode = util.getRandomCode();
    console.log(randomCode);
    res.render('login.ejs',{title:'Index',error:'验证码错误',valicode:escape(randomCode)});
    return
  }
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
				res.redirect('/index/1');
			}else{
				res.render('login.ejs',{title:'Index',error:'用户名或密码错误'});
			}
		}
	});
  return;
});

//logout
router.get('/logout', function(req, res, next) {
  randomCode = util.getRandomCode();
	req.session.userid = null;
  console.log(randomCode);
 	res.render('login.ejs',{title:'Index',valicode:randomCode});
});

module.exports = router;
