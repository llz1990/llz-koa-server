/**
 * 菜单信息 created by llz
 */
const Router = require('koa-router');
const list = new Router();
const model = require('../models/index');
const Utils = require('../common/util');
const Validate = require('../common/validate');

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
    const backUrl = await Utils.readImgBase64(backUrlBase64);
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
    const backUrl = await Utils.readImgBase64(backUrlBase64);
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
    const picUrl = await Utils.readImgBase64(picUrlBase64);
    const sqlData = await model.addPicDetail(listId, picId, picUrl);
    ctx.body = { code: 200, data: sqlData };
  } catch (err) {
    ctx.throw(400, '添加相片失败')
  }
})

/**
 * 查询视频合集信息
 */
list.get('/getVideoList', async (ctx, next) => {
  try{
    const sqlData = await model.selectAllVideos();
    ctx.body = { code: 200, data: sqlData };
  }catch(err) {
    ctx.throw(400, '查询视频失败')
  }
})

/**
 * 添加新的视频文件
 */
 list.post('/addVideo', async(ctx, next) =>{
  try{
    const { videoTitle, videoBase64 } = ctx.request.body;
    const validate = Validate.addVideoCheck({ videoTitle, videoBase64 });
    if (validate) {
      ctx.throw(400, '参数错误!');
    }
    const videoId = `video${Date.now()}`;
    const videoUrl = await Utils.readVideoBase64(videoBase64);
    const userInfo = ctx.session;
    const sqlData = await model.addVideo(videoId, videoTitle, videoUrl, userInfo);
    ctx.body = { code: 200, data: sqlData };
  } catch (err) {
    ctx.throw(400, '添加相册合集失败')
  }
})

/**
 * 添加新的文件视频 （formadata格式）
 */
list.post('/addVideoEx', async (ctx, next) => {
  try{
    const { videoTitle } = ctx.request.body; // 取视频文件名字
    const { videoFileBlob} = ctx.request.files; // ctx.request.files 可以取到dataform数据类型
    if(videoFileBlob && videoFileBlob.path) {
      // 将缓存的视频文件移动到指定目录下：
      const videoUrl = `/videos/${Date.now()}.mp4`;
      await Utils.renameFile(videoFileBlob.path, `./public` + videoUrl);
      const videoId = `video${Date.now()}`;
      const userInfo = ctx.session;
      const sqlData = await model.addVideo(videoId, videoTitle, videoUrl, userInfo);
      ctx.body = { code: 200, data: sqlData };
    }
  } catch (err) {
    ctx.throw(400, '添加相册合集失败')
  }
})


module.exports = list
