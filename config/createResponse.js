'use strict';

module.exports = function createResponse(res, result) {
    res.statusCode = result.code;
    res.statusMessage = result.message;

    return res;
};
