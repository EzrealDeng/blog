function isLogin(req,res,next){
	if(!req.session.userid){
		console.log('请先登录');
		res.redirect('/users/login');
		return;
	}
	next();
}

exports.isLogin = isLogin;