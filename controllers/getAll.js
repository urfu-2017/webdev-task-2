'use strict';
const getAll = require('../models/db');

module.exports = async (req, res) => {

    return await getAll.getAll(req.query.sort, req.query.query, res);
};
