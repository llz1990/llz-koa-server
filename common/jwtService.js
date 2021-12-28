/**
 * Created by llz 2018.2.28
 * token 服务
 */

const jwt = require("jsonwebtoken");
const processEnv = process.env; 
const JWT_SECRET = processEnv.JWT_SECRET || "n9r5tiv5";
 
module.exports = {
    /**
     * 获取jwt token
     * @param data
     * @returns {*}
     */
    sign(data) {
      let config = 24 * 3600;
      let token = jwt.sign(
        {
          exp:
            Math.floor(Date.now() / 1000) + config ,
          data: data
        },
        JWT_SECRET
      );
      return token;
    },
    /**
     * 验证token，返回不是null就是通过验证
     * @param token
     * @returns {data | null}
     */
    verify(token) {
      try {
        let decode = jwt.verify(token, JWT_SECRET);
        return decode.data;
      } catch (err) {
        // 不处理err
        return null;
      }
    }
  };