drop database if exists `llz001`;

create database `llz001`;

create table if not exists users(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    avator VARCHAR(100) NOT NULL,
    moment VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert into users (name, password, avator, moment) values ('jack', '123456', '', '');
