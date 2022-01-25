const fs = require('fs');
const path = require('path');

class Utils {
    static getObjectData(data){
        if(typeof data !== 'object') return false;
        return  JSON.parse(JSON.stringify(data));
    }

    /**
     * 读取图片base64文件并保存到本地：
     * @param {*} data base64编码
     */
     static async readImgBase64(data) {
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

    /**
     *  读取视频base64文件并保存到本地：
     * @param {*} data base64编码
     */
    static async readVideoBase64(data) {
        const dataBuffer = Buffer.from(data, 'base64');
        const filePath = `/videos/${Date.now()}.mp4`;
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

    /**
     * 移动文件
     * @param {*} oldPath 
     * @param {*} newPath 
     */
    static async renameFile(oldPath, newPath) {
        return new Promise((resolve, reject) => {
            fs.rename(oldPath, newPath, (error) => {
                if(error) {
                    reject('移动文件失败');
                } else {
                    resolve(newPath);
                }
            })
        })
    }
}

module.exports = Utils;