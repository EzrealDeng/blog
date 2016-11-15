var ueditor = require("ueditor") ;
var path = require('path');

function auth(app){
		//未登录用户进行拦截
	app.use(function (req, res, next) {
	  if (req.session.userid) {  // 判断用户是否登录
	    next();
	  } else {
	    // 解析用户请求的路径
	    var arr = req.url.split('/');
	    // 去除 GET 请求路径上携带的参数
	    for (var i = 0, length = arr.length; i < length; i++) {
	      arr[i] = arr[i].split('?')[0];
	    }
	    // 判断请求路径是否为根、登录、注册、登出，如果是不做拦截
	    if (arr.length > 1 && arr[1] == '') {
	      next();
	    } else if (arr.length > 2 && arr[1] == 'users' && (arr[2] == 'register' || arr[2] == 'login' || arr[2] == 'logout')) {
	      next();
	    } else {  // 登录拦截
	      req.session.originalUrl = req.originalUrl ? req.originalUrl : null;  // 记录用户原始请求路径
	      //req.flash('error', '请先登录');
	      res.redirect('/users/login');  // 将用户重定向到登录页面
	    }
	  }
	});
}

function UEUploadImgConfig(app){
	app.use("/ueditor/ue", ueditor(path.join(__dirname, 'public'), function (req, res, next) {
    // ueditor 客户发起上传图片请求
    if (req.query.action === 'uploadimage') {
        var foo = req.ueditor;

        var imgname = req.ueditor.filename;

        var img_url = '/images/ueditor/';
        res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
        res.setHeader('Content-Type', 'text/html');//IE8下载需要设置返回头尾text/html 不然json返回文件会被直接下载打开
    }
    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage') {
        var dir_url = '/images/ueditor/';
        res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
    }
    // 客户端发起其它请求
    else {
        // console.log('config.json')
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/ueditor/nodejs/config.json');
    }
}));
}
//获取随机验证码
 function getRandomCode() {
	    	var result = '';
	    	var codeNumber = Math.floor(Math.random() * 3) + 4;
	    	 for(var i=0;i<codeNumber;i++){
	           var ranNum = Math.ceil(Math.random() * 25); //生成一个0到25的数字
	            //大写字母'A'的ASCII是65,A~Z的ASCII码就是65 + 0~25;然后调用String.fromCharCode()传入ASCII值返回相应的字符并push进数组里
	            result += String.fromCharCode(65+ranNum);
	        }
	       return result;
	    }

exports.auth = auth;
exports.UEUploadImgConfig = UEUploadImgConfig;
exports.getRandomCode = getRandomCode;