/***
	mysql数据库连接
**/
var mysql = require('mysql');

var pool = mysql.createPool({
	host:'localhost',
	user:'root',
	password:'',
	database:'nodesample'
});

module.exports = pool;