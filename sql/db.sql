drop database if exists `llz001`;

create database `llz001`;

use llz001;

-- 用户信息表
create table if not exists users(
    id INT NOT NULL AUTO_INCREMENT,
    userId VARCHAR(10) NOT NULL,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    avatar VARCHAR(2000) NOT NULL,
    roles VARCHAR(200) NOT NULL,
    moment VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

-- 相册集合表
create table if not exists pic_list(
    id INT NOT NULL AUTO_INCREMENT,
    listId VARCHAR(100) NOT NULL,
    listName VARCHAR(100) NOT NULL,
    backUrl VARCHAR(2000) NOT NULL,
    descInfo VARCHAR(2000) NOT NULL,
    PRIMARY KEY (id),
    index (listId)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

-- 相册详情表
create table if not exists pic_detail(
    id INT NOT NULL AUTO_INCREMENT,
    picId VARCHAR(100) NOT NULL,
    listId VARCHAR(100) NOT NULL,
    picUrl VARCHAR(2000) NOT NULL,
    PRIMARY KEY (id),
    index(picId, listId)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

-- 视频集合表
create table if not exists video_list(
    id INT NOT NULL AUTO_INCREMENT,
    videoId VARCHAR(100) NOT NULL COMMENT '视频ID',
    videoTitle VARCHAR(100) NOT NULL DEFAULT '' COMMENT '视频标题',
    videoImg VARCHAR(2000) NOT NULL DEFAULT '' COMMENT '视频封面',
    videoUrl VARCHAR(2000) NOT NULL DEFAULT '' COMMENT '视频资源链接',
    videoCreator VARCHAR(100) not NULL DEFAULT '' COMMENT '视频作者',
    creatorAvatar VARCHAR(2000) NOT NULL DEFAULT '' COMMENT '视频作者头像',
    PRIMARY KEY (id),
    index (videoId)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;