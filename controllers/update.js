/* eslint-disable linebreak-style */
'use strict';
const base = require('../models/db.js');

module.exports = async (req, res) => {

    return await base.update(req, res);
};
