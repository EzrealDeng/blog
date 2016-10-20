/*********

blogDao层
负责与数据库的交互操作

**********/


var pool = require('../util/pool.js');

//add blog
function addBlog(data,callback){
	var sql = 'insert into blog_t(userid,username,content,createtime,type,title) values (?,?,?,?,?,?)';
	pool.query(sql,[data.userid,data.username,data.content,data.createtime,data.type,data.title],function(err,rows){
		if(err){
			console.log("addBlog Dao Error"+ err);
			callback(err);
		}else{
			callback(null,rows)
		}
	})
}


//remove blog
function removeBlogByID(data,callback){
	var sql= 'delete from blog_t where id = ?';
	pool.query(sql,[data.id],function(err,rows){
		if(err){
				console.log('BlogDao removeBlogByID error:' + err);
				callback(err);
		}else{
			callback(null,rows);
		}
	});
}

//update blog
function updateBlogByID(data,callback){

}

//get blog by id
function getBlogById(data,callback){
		var sql = "select * from blog_t where id = ?";
		pool.query(sql,[data.id],function(err,rows){
			if(err){
				console.log("BlogDao GetBlogById Err" + err);
				callback(err);
			}else{
				callback(null,rows);
			}
		});
}

//get blog list
function getBlogList(callback){
	var sql = 'select * from blog_t group by createtime desc';
	pool.query(sql,null,function(err,rows){
		if(err){
			callback(err);
		}else{
			callback(null,rows);
		}
	});
}

exports.addBlog = addBlog;
exports.removeBlogByID = removeBlogByID;
exports.getBlogList = getBlogList;
exports.getBlogById = getBlogById;