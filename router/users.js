/**
 * 用户信息 created by llz 
 */
const Router = require('koa-router');
const users = new Router();
const model = require('../models/index');
const Utils = require('../common/util');
const ResHandleObj = require('../common/resHandle');
const Validate = require('../common/Validate');

// 注册用户信息：
users.post('/register', async (ctx, next) => {
  
})

// 用户登录验证：
users.post('/login', async (ctx, next) => {
  const {name, password} = ctx.request.body;
  const validate = Validate.loginCheck({name, password});
  if(validate) {
    ctx.throw(400, '参数错误!');
  }
  const sqlData = await model.findUserData(name, password);  // 查找用户是否存在
  if(sqlData && sqlData.length > 0) {
    ctx.body = new ResHandleObj(0, sqlData);
  } else {
    ctx.throw(400, '当前用户不存在!');
  }
})

module.exports = users
