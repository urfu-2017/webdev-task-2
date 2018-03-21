/* eslint-disable linebreak-style */
'use strict';
const Post = require('../models/db.js');

module.exports = async (req, res) => {

    return await Post.postAll(req, res);
};
