/* eslint-disable linebreak-style */
'use strict';
const ObjectID = require('mongodb').ObjectID;
const Post = require('../models/postModel.js');

module.exports = async (req, res, db) => {
    let mark = req.body.mark;
    if (mark === '' || mark === undefined) {
        mark = 'X';
    }
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const note = { place: req.body.place, description: req.body.body,
        mark: mark, time: details._id.getTimestamp() };

    return await Post.get(db, note, res);
};
