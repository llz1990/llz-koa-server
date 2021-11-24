/**
 * 主页信息
 */
const Router = require('koa-router');
const list = new Router();

// 路由重定向：
list.redirect('', '/list');

list.get('/list', async(ctx , next) => {
  ctx.body = "hello world";
})

list.post('/update', async(ctx , next) => {
  const rb = ctx.request.body
  console.log(rb);
  ctx.response.body = 'success';
})

module.exports = list
