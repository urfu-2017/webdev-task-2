/* eslint-disable linebreak-style */
'use strict';
const base = require('../models/db');

module.exports = async (req, res) => {
    return await base.deleteAll(res);
};
