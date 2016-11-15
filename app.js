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
var message = require('./routes/messages');
var test = require('./test/testRegister');

var PORT = 80;//监听端口
var app = express();
var validate = require('./util/validate')
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));
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

//未登录用户需要验证
validate.auth(app);
//配置UEeditor 上传图片
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
app.use('/message',message);
app.use('/test',test);

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
