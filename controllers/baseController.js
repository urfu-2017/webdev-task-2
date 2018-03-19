'use strict';

class Base {
    constructor(req, res) {
        this._req = req.query;
        this._res = res;
    }

    createResponse(result) {
        this._res.statusCode = result.code;
        this._res.statusMessage = result.message;
        this._res.send(result);
    }

}

module.exports = Base;
