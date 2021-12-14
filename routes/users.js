/**
 * 用户信息
 */
const Router = require('koa-router');
const users = new Router();
const query = require('../db/index');
const Utils = require('../common/util');

// 用户登录验证：
users.post('/login', async (ctx, next) => {
  ctx.body = ctx;
})

// 取用户信息：
users.get('/user', async (ctx, next)=> {
  const data = await new Promise( (resolve, reject) => {
    const SQL_CONST = "select * from runoob_tbl;";
    query(SQL_CONST, (err, data) => {
      const result = Utils.getObjectData(data);
      if(!result){
        reject('取值有误')
      } else {
        resolve(result);
      }
    })
  })
  console.log('取到数据库信息：', data);
  ctx.body = data;
})

users.get('/info', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = users
