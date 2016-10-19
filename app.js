var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var ueditor = require("ueditor")  ;
var index = require('./routes/index');
var users = require('./routes/users');
var blog = require('./routes/blog');
var PORT = 8012;//监听端口
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'blogjustgo', // 建议使用 128 个字符的随机字符串
    cookie: { maxAge: 60 * 1000*30},
    resave:true,
    saveUninitialized:true
}));

//未登录用户进行拦截
app.use(function (req, res, next) {
  console.log(1);
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
      res.redirect('users/login');  // 将用户重定向到登录页面
    }
  }
});

//UEditor 富文本编辑器配置
/*app.use("/ueditor/ue", ueditor(path.join(__dirname, 'public'), function(req, res, next) {  
// ueditor 客户发起上传图片请求  
    if(req.query.action === 'uploadimage'){  
        var foo = req.ueditor;  
        var date = new Date();  
        var imgname = req.ueditor.filename;  
  
        var img_url = '/images/ueditor/';  
        res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做  
    }  
//  客户端发起图片列表请求  
    else if (req.query.action === 'listimage'){  
        var dir_url = '/images/ueditor/';  
        res.ue_list(dir_url);  // 客户端会列出 dir_url 目录下的所有图片  
    }  
// 客户端发起其它请求  
    else {  
  
        res.setHeader('Content-Type', 'application/json');  
        res.redirect('/ueditor/ueditor.config.json')  
    }})); */  
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
app.use('/index', index);
app.use('/users', users);
app.use('/blog',blog);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(PORT,function(){
  console.log('listen at port : ' + PORT );
})

module.exports = app;
