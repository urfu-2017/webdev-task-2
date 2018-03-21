'use strict';
const copy = require('../models/db');

module.exports = async (req, res) => {

    return await copy.cop(res, req);
};
