/* eslint-disable linebreak-style */
'use strict';
const Search = require('../models/db');
module.exports = async (req, res) => {
    return await Search.find(req, res);
};
