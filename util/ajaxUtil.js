//ajax 请求

function sendAjax(data,callback){
	$.ajax(
		{ 
		url: data.url, 
		type:data.type,
		context: document.body, 
		success: callback(data);
}