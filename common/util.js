const fs = require('fs');
const path = require('path');

class Utils {
    static getObjectData(data){
        if(typeof data !== 'object') return false;
        return  JSON.parse(JSON.stringify(data));
    }

    /**
     * 读取base64文件并保存到本地：
     * @param {*} data base64编码
     */
     static async readBase64(data) {
        const dataBuffer = Buffer.from(data, 'base64');
        const filePath = `/images/${Date.now()}.png`;
        return new Promise((resolve, reject) => {
            fs.writeFile('./public'+ filePath, dataBuffer, (error) => {    
                if(error) {
                    reject('读取文件失败');
                } else {
                    resolve(filePath);
                }
            });
        })
    }
}

module.exports = Utils;