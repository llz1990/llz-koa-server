const errorHandle = async (ctx, next) => {
        let status = 0;
        let fileName = "";
        console.log('进入错误处理中间件 ==========================>')
        try{
            // 等待返回的状态 status 取值：
            await next();
            status = ctx.status;
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
        ctx.response.body = `取到错误信息：${status}`;
    };

module.exports = errorHandle;