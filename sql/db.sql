drop database if exists `llz001`;

create database `llz001`;

use llz001;
create table if not exists users(
    id INT NOT NULL AUTO_INCREMENT,
    userId VARCHAR(10) NOT NULL,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    avatar VARCHAR(2000) NOT NULL,
    roles VARCHAR(200) NOT NULL,
    moment VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


insert into users (userId, name, password, avatar, roles, moment) values ('100001', 'jack', '123456', 'https://wx.qlogo.cn/mmopen/vi_32/un2HbJJc6eiaviaibvMgiasFNlVDlNOb9E6WCpCrsO4wMMhHIbsvTkAbIehLwROVFlu8dLMcg00t3ZtOcgCCdcxlZA/132', 'admin', '');
