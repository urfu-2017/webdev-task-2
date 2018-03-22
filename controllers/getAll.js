'use strict';
const getAll = require('../models/db');

module.exports = async (req, res) => {
    console.info(req.query.sort + ' ' + req.query.query);

    return await getAll.getAll(req.query.sort, req.query.query, res);
};
