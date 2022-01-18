/**
 * 用户信息 created by llz 
 */
const Router = require('koa-router');
const users = new Router();
const model = require('../models/index');
const Validate = require('../common/validate');
const crypto = require("crypto");
const jwtService = require('../common/jwtService');

// 注册用户信息:
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
    ctx.body = { code: 200, data: '用户注册成功' };
  } catch (err) {
    ctx.throw(400, '用户注册失败');
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
    // 登录后获取token值,同时缓存本地user信息
    const userId = sqlData[0].userId;
    const token = jwtService.sign({
      userId
    });
    // 登陆成功后设置本地session信息：
    ctx.session = {
      userId,
      name: sqlData[0].name,
      avatar: sqlData[0].avatar,
      roles: sqlData[0].roles,
    };
    console.log('设置session值 =====>', ctx.session);
    ctx.body = { code: 200, data: token };
  } else {
    ctx.throw(400, '登录账户或者密码错误!');
  }
})

/**
 * 通过前端的取到的token 来验证并返回当前用户信息
 */
users.post('/checkToken', async (ctx, next) => {
  const { token } = ctx.request.body;
  if (!token) {
    ctx.throw(401, "请先登录账号");
  }
  let data = jwtService.verify(token);   // 通过取到的token 信息验证当前用户
  if (!data || !data.userId) {
    ctx.throw(401, "token已经过期，请重新登录");
  }
  const sqlData = await model.findUserById(data.userId);  // 查找用户是否存在
  const userList = {
    roles: [sqlData[0].roles],
    name: sqlData[0].name,
    avatar: sqlData[0].avatar
  }
  ctx.body = {
    code: 200,
    data: {
      userList
    }
  }
})


module.exports = users
