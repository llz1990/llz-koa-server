const mysql = require('mysql');
const config = require('../config');
const list = require('../router/list');
// 创建连接池
const pool = mysql.createPool({
    host: config.database.HOST,          // 连接的服务器(代码托管到线上后，需改为内网IP，而非外网)
    port: config.database.PORT,          // mysql服务运行的端口
    database: config.database.DATABASE,  // 选择的库
    user: config.database.USERNAME,      // 用户名
    password: config.database.PASSWORD   // 用户密码   
})

/**
 * sql语句查询封装成 Promise
 * @param {*} sql 执行的sql语句
 * @returns 
 */
const query = async sql => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject('数据库连接错误');
            } else {
                connection.query(sql, (error, data) => {
                    if (error) {
                        reject('数据库查询错误');
                    } else {
                        resolve(data);
                    }
                });
                connection.release(); // 每一次sql语句执行完需要释放连接池
            }

        })
    })
}

// 查找某个用户是否存在
exports.findUserData = async (name, password) => {
    let sql = `select * from users where name= "${name}" and password = "${password}";`
    return query(sql);
}

// 注册用户
exports.registerData= async (name, password) =>{
    let sql = `insert into users set name= "${name}", password = "${password}", avator= '', moment = '';`
    return query(sql);
}

// 通过用户ID查询用户信息
exports.findUserById = async (userId) => {
    let sql = `select * from users where userId= "${userId}";`
    return query(sql);
}

// 查询相册合集
exports.selectAllPicList = async () => {
    let sql = `select * from pic_list`;
    return query(sql);
}

// 增加相册合集
exports.addPic = async (listId, listName, backUrl, descInfo) => {
    let sql = `insert into pic_list (listId, listName, backUrl, descInfo) values ("${listId}", "${listName}", "${backUrl}", "${descInfo}");`;
    return query(sql);
}

// 编辑相册合集
exports.editPic = async (listId, listName, backUrl, descInfo) => {
    let sql = `update pic_list set listName="${listName}", backUrl="${backUrl}", descInfo="${descInfo}" where listId="${listId}";`;
    return query(sql);
}

// 删除指定相册合集
exports.deletePic = async (listId) => {
    let sql = `delete from pic_list where listId = "${listId}"`;
    return query(sql);
}
