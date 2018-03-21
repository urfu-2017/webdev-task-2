'use strict';
const base = require('../models/db.js');

module.exports = async (req, res) => {

    return await base.remove(req, res);
};
