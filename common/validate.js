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
}

module.exports = Validate