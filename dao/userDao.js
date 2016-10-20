/*********

userDao层
负责与数据库的交互操作

**********/

var pool = require('../util/pool.js');

//新增用户
function insertUser(data,callBack){
	var sql = 'insert into user(username,password,email) values(?,?,?)';
	pool.query(sql,[data.username,data.password,data.email],function(err,rows){
		if(err){
			console.log(err);
			callBack(err,null);
		}else{
			callBack(null,rows);
		}
	})
}

//获取用户列表
function getUserList(callBack){
	var sql = 'select * from user ';
	pool.query(sql,null,function(err,rows){
		if(err){
			callBack(err,null);
		}else{
			callBack(null,rows)
		}
	});
}

//根据用户ID获得用户
function getUserById(data,callBack){
  var sql = 'select * from user where uid = ?';
  pool.query(sql,[data.userid],function(err,rows){
		if(err){
			callBack(err,null);
		}else{
			console.log(rows);
			callBack(null,rows);
		}
	});
}
//根据用户吗名和密码获取用户
function getUserByNameAndPwd(data,callBack){
	var sql = "select * from user where username = ? and password = ?";
	pool.query(sql,[data.username,data.password],function(err,rows){
		if(err){
			callBack(err,null);
		}else{
			callBack(null,rows);
		}
	})
}

//修改用户
function updateUser(){

}


exports.insertUser = insertUser;
exports.getUserById = getUserById;
exports.updateUser = updateUser;
exports.getUserByNameAndPwd = getUserByNameAndPwd;