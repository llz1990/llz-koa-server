/**
 * 所有的路由集合的封装
 */
const Router = require('koa-router');
const router = new Router();

const list = require('./list');
const users = require('./users');

router.use(list.routes(), list.allowedMethods());     // 列表相关
router.use(users.routes(), users.allowedMethods());   // 用户信息相关

/**
 * 取所有相册合集
 */
 router.get('/test', async(ctx , next) => {
    try {
      ctx.body = { code: 200, data: '接口测试成功' };
    } catch (err) {
      ctx.throw(400, '接口测试失败');
    }
  })

module.exports = router;

