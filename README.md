# blog
nodejs + expres + ejs + mysql 简易微博

下载后执行建表语句，
修改pool.js的数据库连接
npm insatall 
node app.js

sql 建表语句如下：
CREATE TABLE `blog_t` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`userid` INT(11) NOT NULL COMMENT '用户id',
	`username` VARCHAR(20) NOT NULL COMMENT '用户名',
	`title` VARCHAR(200) NOT NULL COMMENT '博客标题',
	`type` VARCHAR(200) NOT NULL COMMENT '博客分类 1.推荐、2.CSS,3.JS、4.NodeJs、5.其他',
	`description` TEXT NOT NULL COMMENT '简介',
	`content` VARCHAR(20000) NOT NULL COMMENT '博客内容',
	`createtime` TIMESTAMP NULL DEFAULT NULL COMMENT '创建时间',
	`updatetime` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
	INDEX `id` (`id`)
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=69
;
CREATE TABLE `user` (
	`uid` INT(11) NOT NULL AUTO_INCREMENT,
	`username` VARCHAR(30) NOT NULL,
	`password` VARCHAR(30) NOT NULL,
	`email` VARCHAR(30) NOT NULL,
	PRIMARY KEY (`uid`)
)
COLLATE='gb2312_chinese_ci'
ENGINE=InnoDB
AUTO_INCREMENT=69
;


CREATE TABLE `message` (
	`id` INT(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
	`blogid` INT(11) NOT NULL COMMENT '博客id',
	`parentid` INT(11) NULL DEFAULT NULL COMMENT '父留言id',
	`userid` INT(11) NOT NULL COMMENT '用户id',
	`username` VARCHAR(50) NOT NULL COMMENT '用户名',
	`content` VARCHAR(4000) NOT NULL COMMENT '留言内容',
	`createtime` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
	INDEX `id` (`id`)
)
COMMENT='留言列表'
COLLATE='utf8_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=11
;
