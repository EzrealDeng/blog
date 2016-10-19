//上传图片
//上传图片
var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');

router.post('/',function(req,res,next){
	var form = new multiparty.Form();
	form.maxFilesSize = 2 * 1024 * 1024;
	form.uploadDir="public/upload";
	form.parse(req,function(err,fields,files){
		if(err){
			console.log(err);
		}else{
			res.writeHead(200, {'content-type': 'text/plain'});
     	res.write('received upload:\n\n');
     	res.end(util.inspect({fields: fields, files: JSON.stringify(files)}));
		}
	});
}
);

module.exports = router;