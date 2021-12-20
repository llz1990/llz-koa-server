const errorHandle = async (ctx, next) => {
        let status = 0;
        let fileName = "";
        console.log('进入错误处理中间件 ==========================>')
        try{
            await next();
            status = ctx.status;   // 取路由正常返回的状态
        }catch(err){
            status = 500;
        }
        if(status >= 400){
            switch(status){
                case 400:
                case 404:
                case 500:
                    fileName = status;
                    break;
                default:
                    fileName = "other";
                    break;
            }
        }
        ctx.response.status = status;
        ctx.response.body = `取到路由错误信息，错误状态码为: ${status}`;
    };

module.exports = errorHandle;