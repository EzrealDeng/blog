/*********
messageDao层
负责与数据库的交互操作,用户留言
**********/

var pool = require('../util/pool.js');

//add Message
function addMessage(data,callback){
	var sql = 'insert into message(userid,username,description,content,createtime,type,title) values (?,?,?,?,?,?,?)';
	pool.query(sql,[data.userid,data.username,data.description,data.content,data.createtime,data.type,data.title],function(err,rows){
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

}



//get Message by id
function getMessageById(data,callback){
		var sql = "select * from message_t where id = ?";
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
	var sql = 'select * from message_t group by createtime desc';
	pool.query(sql,null,function(err,rows){
		if(err){
			callback(err);
		}else{
			callback(null,rows);
		}
	});
}
//导出各个方法以供调用
exports.addMessage = addMessage;
exports.removeMessageByID = removeMessageByID;
exports.getMessageList = getMessageList;
exports.getMessageById = getMessageById;
exports.getMessageByType = getMessageByType;