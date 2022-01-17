const Koa = require('koa')
const cors = require('koa-cors');
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-session');
const errorHandle = require('./router/errorHandle');

//相关中间件 middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(views(__dirname + '/views', {
  extension: 'pug'
}))
app.use(cors({
  credentials: true,
  origin: ctx => ctx.header.origin
}));

// 配置session中间件
app.keys = ['dragon'];
const CONFIG = {
  key: 'dragon:sess', /** (string) cookie key (default is koa:sess) */
  maxAge: 86400000,
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};
app.use(session(CONFIG, app));


// 当前中间件可以用来测试一个服务请求的总响应时间
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`当前请求方法: ${ctx.method}  当前请求的路径: ${ctx.url}  当前请求的时间: ${ms}ms`)
})

// router 路由
const router = require('./router/index')
app.use(router.routes(), router.allowedMethods())

// 调用错误处理中间件
app.use(errorHandle);

module.exports = app
