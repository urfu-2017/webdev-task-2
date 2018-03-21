'use strict';

const log = require('../libs/log')(module);
const ObjectID = require('mongodb').ObjectID;

module.exports = class Post {
    static get(db, req, res) {
        let mark = req.body.mark;
        mark = !(mark === '' || mark === undefined);
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const note = { place: req.body.place, description: req.body.body,
            mark: mark, time: details._id.getTimestamp() };
        db.collection('notes').insert(note, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
                log.debug(result.ops[0]);
            }
        });
    }
};
