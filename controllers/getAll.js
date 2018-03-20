'use strict';
const getAll = require('../models/getAllModel.js');
module.exports = async (req, res, db) => {
    let sortObj = '';
    let sortType = req.query.sort;
    if (sortType === 'time') {
        sortObj = { time: -1 };
    } else if (sortType === 'alph') {
        sortObj = { description: 1 };
    }
    let search = req.query.query || '';
    let details = '';
    if (search === '') {
        details = {};
    } else {
        details = { 'description': search };
    }

    return await getAll.get(db, details, sortObj, res);
};
