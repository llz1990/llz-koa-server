/**
 * 所有的路由封装
 */
const Router = require('koa-router');
const router = new Router();

const list = require('./list');
const users = require('./users');

router.use(list.routes(), list.allowedMethods());
router.use(users.routes(), users.allowedMethods());

module.exports = router;

