var pool = require('../util/pool.js');

//add blog
function addBlog(data,callback){
	var sql = 'insert into blog_t(userid,username,content,createtime) values (?,?,?,?)';
	pool.query(sql,[data.userid,data.username,data.content,data.createtime],function(err,rows){
		if(err){
			console.log(err);
			callback(err);
		}else{
			callback(null,rows)
		}
	})
}
//remove blog
function removeBlog(data,callback){

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
exports.removeBlog = removeBlog;
exports.getBlogList = getBlogList;