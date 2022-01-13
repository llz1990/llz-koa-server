/**
 * 菜单信息 created by llz
 */
const Router = require('koa-router');
const list = new Router();
const model = require('../models/index');
const Utils = require('../common/util');
const Validate = require('../common/Validate');

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
    const validate = Validate.addPicCheck({ listName, backUrlBase64, descInfo });
    if (validate) {
      ctx.throw(400, '参数错误!');
    }
    const listId = `list${Date.now()}`;
    const backUrl = await Utils.readBase64(backUrlBase64);
    const sqlData = await model.addPic(listId, listName, backUrl, descInfo);
    ctx.body = { code: 200, data: sqlData };
  } catch (err) {
    ctx.throw(400, '添加相册合集失败')
  }
})

/**
 * 编辑相册
 */
 list.post('/editPic', async(ctx, next) =>{
  try{
    const {listId, listName, backUrlBase64, descInfo } = ctx.request.body
    const backUrl = await Utils.readBase64(backUrlBase64);
    const sqlData = await model.editPic(listId, listName, backUrl, descInfo);
    ctx.body = { code: 200, data: sqlData };
  } catch (err) {
    ctx.throw(400, '编辑相册合集失败')
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

/**
 * 通过相册ID 查询该相册下的所有相册
 */
list.get('/getPicDetail', async(ctx, next) => {
  try{
    const { listId } = ctx.request.query;
    const sqlData = await model.getPicDetailById(listId);
    ctx.body = { code: 200, data: sqlData };
  }catch (err) {
    ctx.throw(400, '查询相册详情失败')
  }
})

/**
 * 指定相册中添加相片
 */
 list.post('/addPicDetail', async(ctx, next) =>{
  try{
    const { listId, picUrlBase64} = ctx.request.body;
    const validate = Validate.addPicDetailCheck({ listId, picUrlBase64 });
    if (validate) {
      ctx.throw(400, '参数错误!');
    }
    const picId = `pic${Date.now()}`;
    const picUrl = await Utils.readBase64(picUrlBase64);
    const sqlData = await model.addPicDetail(listId, picId, picUrl);
    ctx.body = { code: 200, data: sqlData };
  } catch (err) {
    ctx.throw(400, '添加相片失败')
  }
})


module.exports = list
