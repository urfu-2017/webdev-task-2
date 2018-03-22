'use strict';
const storage = { notes: [] };
exports.memory = function (req, res, next) {
    req.storage = storage;
    next();
};
