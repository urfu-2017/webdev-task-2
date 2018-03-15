'use strict';

class Response {
    constructor(req, res) {
        this.req = req.query;
        this.res = res;
    }

    createResponse(result) {
        this.res.statusCode = result.code;
        this.res.statusMessage = result.message;
        this.res.send(result);
    }

}

module.exports = Response;
