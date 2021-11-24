const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const errorHandle = require('./routes/errorHandle');

//相关中间件 middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// 当前中间件可以用来测试一个服务请求的总响应时间
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`当前请求方法：${ctx.method}  当前请求的路径：${ctx.url}  当前请求的时间：${ms}ms`)
})

// router 路由
const router = require('./routes/index')
app.use(router.routes(), router.allowedMethods())

// 当上面的路由不通时，会调用错误处理中间件
app.use(errorHandle);

module.exports = app
