# blog
nodejs + expres + ejs + mysql 简易微博

下载后执行建表语句，
修改pool.js的数据库连接
npm insatall 
node app.js

sql 建表语句如下：
CREATE TABLE `blog_t` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`userid` INT(11) NOT NULL,
	`username` VARCHAR(20) NOT NULL,
	`content` VARCHAR(2000) NOT NULL,
	`createtime` TIMESTAMP NULL DEFAULT NULL,
	INDEX `id` (`id`)
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=16
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
AUTO_INCREMENT=66
;