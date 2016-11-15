var userDao = require('../dao/userDao.js');
var async = require('async');

async.waterfall([
	function (callback){
		var user = {
			username:'dengmin',
			password:'123456',
			email:'wendy023@163.com'
		};
		userDao.insertUser(user,function(err,rows){
				callback(err,rows);
		})
	},
	function (data,callback) {
			console.log(2);
			console.log(data.insertId);
			userDao.getUserById({userid:data.insertId},function(err,rows){
				callback(err,rows);
			});
		}
	],
	function(err,data){
		if(err){
			console.log(err);
		}else{
			console.log("__________________________________");
			console.log(data[0].uid);
		}
	});