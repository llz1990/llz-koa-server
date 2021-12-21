/**
 * 用户信息 created by llz 
 */
const Router = require('koa-router');
const users = new Router();
const model = require('../models/index');
const Utils = require('../common/util');
const ResHandleObj = require('../common/resHandle');
const Validate = require('../common/Validate');
const crypto = require("crypto");

// 注册用户信息：
users.post('/register', async (ctx, next) => {
  const { name, password, checkpwd } = ctx.request.body;
  const validate = Validate.registerCheck({ name, password, checkpwd });
  if (validate) {
    ctx.throw(400, '参数错误!');
  }
  if (password !== checkpwd) {
    ctx.throw(400, '您输入的密码不一致');
  }
  const md5 = crypto.createHash("md5");
  const passwordMd5 = md5.update(password).digest("hex");
  try {
    const sqlData = await model.registerData(name, passwordMd5);
    ctx.body = new ResHandleObj(0, sqlData);
  } catch (err) {
    ctx.throw(400, '用户注册失败');
  }
})

// 用户登陆之前验证用户是否处于登陆状态（session 是否过期）
users.get('/checkIsLogin', async (ctx, next) =>{
  if (ctx.session && ctx.session.user) {
    ctx.body = new ResHandleObj(0, '用户处于登录状态');
  } else {
    ctx.body = new ResHandleObj(-1, '当前用户没有登录');
  }
})

// 用户登录：
users.post('/login', async (ctx, next) => {
  const { name, password } = ctx.request.body;
  const validate = Validate.loginCheck({ name, password });
  if (validate) {
    ctx.throw(400, '参数错误!');
  }
  const sqlData = await model.findUserData(name, password);  // 查找用户是否存在
  if (sqlData && sqlData.length > 0) {
    // 登陆成功后缓存 session 
    ctx.session = {
      user: name
    }
    ctx.body = new ResHandleObj(0, sqlData);
  } else {
    ctx.body = new ResHandleObj(-1, `登陆账户或密码错误`);
  }
})

// 账号退出登录
users.post('/logout', async (ctx) => {
  ctx.session = null;  // 清空session
  ctx.body = new ResHandleObj(0, `用户退出登录`);
});

module.exports = users
