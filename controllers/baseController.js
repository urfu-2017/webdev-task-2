'use strict';

class Base {
    constructor(req, res) {
        this._req = req.query;
        this.res = res;
    }

    createResponse(result) {
        this.res.statusCode = result.code;
        this.res.statusMessage = result.message;
        this.res.send(result);
    }

}

module.exports = Base;
