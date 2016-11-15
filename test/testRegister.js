var express = require('express');
var router = express.Router();
var auth = require('../util/validate.js');
var userDao = require('../dao/userDao.js');
var messageDao = require('../dao/messageDao.js');
var Promise = require("bluebird");
var userDaoB = Promise.promisifyAll(userDao);
var async = require("async");
var fs = Promise.promisifyAll(require('fs'));


/* GET Type Blog List page. */
router.post('/', function(req, res, next) {
	var data ={
		username:'dengmin',
		password:'123456',
		email:'wendy023@163.com'
	};
	userDao.getUserList(function(err,rows){
		if(err){
			console.log(err);
			 res.render('index.ejs', {title: '获取失败' ,userid:req.session.userid});
		}else{
			for(var i in rows){
				if(rows[i].username == data.username){
					console.log("user exists !");
					res.send(
						 {
						info:"user exists !"
					});
					return
				}
			}
			userDao.insertUser(data,function(err,lines){
						if (err) {
							console.log(err);
						}else{
							console.log(lines);
						}
					})
			console.log("success");
			res.send({
						info:"success !"
					});
			return 
		}
		
	});
   
});

/* GET Type Blog List page. */
router.post('/promise', function(req, res, next) {
	var data ={
		username:'dengmin',
		password:'123456',
		email:'wendy023@163.com'
	};
	vali(data).then(function(rows){
		console.log(rows);
		userDao.insertUser(data,function(err,rows){
			res.send({
						info:"success !"
					});
			return
		})
	},function(err){
		console.log(err);
		res.send(
						 {
						info:"user exists !"
					});
	});
   
});



router.post('/bluebird', function(req, res, next) {
	var data ={
		username:'dengmin',
		password:'123456',
		email:'wendy023@163.com'
	};
	userDaoB.getUserList().then(function(rows){
		console.log(rows);
	})
	res.send(userDaoB);
   
});

router.post('/async',function(req,res,next){
	console.log('sssssssss');
	var data ={
		username:'dengmin',
		password:'123456',
		email:'wendy023@163.com'
	};
	async.waterfall([
		function(callback){
				userDao.getUserList(function(err,rows){
						callback(rows);
					});
			},
		function(rows,callback){
			console.log(rows);
			callback(err,rows);
		},
		  function(error,result) {
            if(error) {
                console.log("error: ",error,"msg: ",result);
            }
            else {
 
                console.log("Mac ",result," is open, all action done");
            }
        }
		]);
});


function vali(data){
			var promise = new Promise(function(resolve,reject){
			userDao.getUserList(function(err,rows){
				if(err){
					reject(err);
				}else{
					resolve(rows);
				}
			});
		});
		return promise
	}

module.exports = router;