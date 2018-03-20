'use strict';
const copy = require('../models/copyModel.js');

module.exports = async (req, res, db) => {
    let from = req.query.from;
    let to = req.query.to;

    return await copy.cop(db, res, from, to);
};
