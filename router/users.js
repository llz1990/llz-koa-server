/**
 * 用户信息 created by llz 
 */
const Router = require('koa-router');
const users = new Router();
const model = require('../models/index');
const Validate = require('../common/Validate');
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
    ctx.body = '用户注册成功';
  } catch (err) {
    ctx.throw(400, '用户注册失败');
  }
})


// 用户登录：
users.post('/login', async (ctx, next) => {
  const { name, password } = ctx.request.body;
  console.log(ctx.request.body)
  const validate = Validate.loginCheck({ name, password });
  if (validate) {
    ctx.throw(400, '参数错误!');
  }
  const sqlData = await model.findUserData(name, password);  // 查找用户是否存在
  if (sqlData && sqlData.length > 0) {
    // 登录后获取token值
    const id = sqlData[0].id;
    const token = jwtService.sign({
      userId: id,
    });
    ctx.body = token;
  } else {
    ctx.throw(400, '登录账户或者密码错误!');
  }
})

// 账号退出登录
users.post('/logout', async (ctx) => {
  ctx.session = null;  // 清空session
  ctx.body = '用户退出登录';
});

module.exports = users
