/**
 * 菜单信息 created by llz
 */
const Router = require('koa-router');
const list = new Router();
const model = require('../models/index');
const Utils = require('../common/util');

/**
 * 取所有相册合集
 */
list.get('/picList', async(ctx , next) => {
  try {
    const sqlData = await model.selectAllPicList();
    ctx.body = { code: 200, data: sqlData };
  } catch (err) {
    ctx.throw(400, '查询相册合集失败');
  }
})

/**
 * 添加新的相册
 */
list.post('/addPic', async(ctx, next) =>{
  try{
    const { listName, backUrlBase64, descInfo } = ctx.request.body;
    const listId = `list${Date.now()}`;
    const backUrl = await Utils.readBase64(backUrlBase64);
    const sqlData = await model.addPic(listId, listName, backUrl, descInfo);
    ctx.body = { code: 200, data: sqlData };
  } catch (err) {
    ctx.throw(400, '添加相册合集失败')
  }
})

list.delete('/deletePic', async(ctx, next) => {
  try{
    const { listId } = ctx.request.body;
    const sqlData = await model.deletePic(listId);
    ctx.body = { code: 200, data: sqlData };
  }catch (err) {
    ctx.throw(400, '无法删除相册合集')
  }
})


module.exports = list
