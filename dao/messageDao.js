/*********
messageDao层
负责与数据库的交互操作,用户留言
**********/

var pool = require('../util/pool.js');

//add Message
function addMessage(data,callback){
	var sql = 'insert into message(blogid,parentid,userid,username,content,createtime) values (?,?,?,?,?,?)';
	pool.query(sql,[data.blogid,data.parentid,data.userid,data.username,data.content,data.createtime],function(err,rows){
		if(err){
			console.log("addMessage Dao Error"+ err);
			callback(err);
		}else{
			callback(null,rows)
		}
	})
}


//remove Message
function removeMessageByID(data,callback){
	var sql= 'delete from message where id = ?';
	pool.query(sql,[data.id],function(err,rows){
		if(err){
				console.log('MessageDao removeMessageByID error:' + err);
				callback(err);
		}else{
			callback(null,rows);
		}
	});
}

//update Message
function updateMessageByID(data,callback){
	var sql = 'update message set description = ?,content = ?,title = ?,type = ?,updatetime=? where id = ?';
	pool.query(sql,[data.description,data.content,data.title,data.type,new Date(),data.id],function(err,rows){
			if (err) {
				console.log("BlogDao updateBlogByID Error :" + err);
				callback(err);
			}else{
				callback(null,rows);
			}
	});
}



//get Message by id
function getMessageById(data,callback){
		var sql = "select * from message where id = ?";
		pool.query(sql,[data.id],function(err,rows){
			if(err){
				console.log("MessageDao GetMessageById Err" + err);
				callback(err);
			}else{
				callback(null,rows);
			}
		});
}

//get Message list
function getMessageList(callback){
	var sql = 'select * from message group by createtime desc';
	pool.query(sql,null,function(err,rows){
		if(err){
			callback(err);
		}else{
			callback(null,rows);
		}
	});
}



//get Message list By blogId
function getMessageListByBlogId(data,callback){
	var sql = 'select * from message where blogid = ? group by createtime desc';
	pool.query(sql,[data.blogid],function(err,rows){
		if(err){
			console.log("MessageDao getMessageListByBlogId Error " + err);
			callback(err);
		}else{
			console.log(rows);
			callback(null,rows);
		}
	});
}
//导出各个方法以供调用
exports.addMessage = addMessage;
exports.removeMessageByID = removeMessageByID;
exports.getMessageList = getMessageList;
exports.getMessageById = getMessageById;
exports.getMessageListByBlogId = getMessageListByBlogId;