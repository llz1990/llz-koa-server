/**
 * 所有的路由封装
 */
const Router = require('koa-router');
const router = new Router();

const list = require('./list');
const users = require('./users');

router.use(list.routes(), list.allowedMethods());     // 列表相关
router.use(users.routes(), users.allowedMethods());   // 用户信息相关

module.exports = router;

