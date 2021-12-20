class ResHandleObj {
    constructor(code, data) {
        this.code = code;
        this.data = data;
    }

    getResData() {
        return {
            code: this.code,
            data: this.data
        }
    }
}

module.exports = ResHandleObj;