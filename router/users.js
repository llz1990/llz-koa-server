/**
 * 用户信息 created by llz 
 */
const Router = require('koa-router');
const users = new Router();
const query = require('../models/index');
const Utils = require('../common/util');

// 用户登录验证：
users.post('/login', async (ctx, next) => {
  const data = {
    code: 200,
    data: '正常响应'
  }
  ctx.body = data;
})

// 取用户信息：
users.get('/user', async (ctx, next)=> {
  const SQL_CONST = `select * from runoob_tbl;`;
  const data = await query(SQL_CONST); 
  const result = Utils.getObjectData(data);
  console.log('取到数据库信息：', result);
  ctx.body = result;
})

users.get('/info', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = users
