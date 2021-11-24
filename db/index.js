const mysql = require('mysql');

// 创建连接池
const pool = mysql.createPool({
    host: 'localhost', // 连接的服务器(代码托管到线上后，需改为内网IP，而非外网)
    port: 3306, // mysql服务运行的端口
    database: 'llz001', // 选择的库
    user: 'root', // 用户名
    password: 'llz1990!!!' // 用户密码   
})

// 连接数据库，并执行sql语句
const dbQuery = (sql,callback) =>{
    pool.getConnection(function(err, connection){
        connection.query(sql, function (err, data) {
            callback(err,data)
            connection.release()
        })
    })
}

module.exports = dbQuery;