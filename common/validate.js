const Joi = require('joi');

class Validate {
    constructor() { }

    /**
     * 用户登录校验
     * @param {*} params 
     * @returns 
     */
    static loginCheck(params) {
        const schema = Joi.object({
            name: Joi.string().allow('').required(),
            password: Joi.string().allow('').required(),
        })
        const { error } = schema.validate({
            name: params.name,
            password: params.password,
        })
        return error;
    }

    /**
     * 用户注册验证
     * @param {*} params 
     */
    static registerCheck(params) {
        const schema = Joi.object({
            name: Joi.string().allow('').required(),
            password: Joi.string().allow('').required(),
            checkpwd: Joi.string().allow('').required()
        })
        const { error } = schema.validate({
            name: params.name,
            password: params.password,
            checkpwd: params.checkpwd
        })
        return error;
    }

    /**
     *  添加新的相册参数校验
     * @param {*} params 
     */
    static addPicCheck(params) {
        const schema = Joi.object({
            listName: Joi.string().allow('').required(),
            backUrlBase64: Joi.string().allow('').required(),
            descInfo: Joi.string().allow('').required()
        })
        const { error } = schema.validate({
            listName: params.listName,
            backUrlBase64: params.backUrlBase64,
            descInfo: params.descInfo
        })
        return error;
    }

    /**
     *  指定相册添加相片参数校验
     * @param {*} params {listId, picId, picUrlBase64}
     */
    static addPicDetailCheck(params) {
        const schema = Joi.object({
            listId: Joi.string().allow('').required(),
            picUrlBase64: Joi.string().allow('').required()
        })
        const { error } = schema.validate({
            listId: params.listId,
            picUrlBase64: params.picUrlBase64
        })
        return error;
    }
}

module.exports = Validate