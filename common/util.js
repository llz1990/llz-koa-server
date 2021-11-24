class Utils {
    static getObjectData(data){
        if(typeof data !== 'object') return false;
        return  JSON.parse(JSON.stringify(data));
    }
}

module.exports = Utils;