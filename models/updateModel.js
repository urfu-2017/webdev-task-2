'use strict';

const log = require('../libs/log')(module);
const ObjectID = require('mongodb').ObjectID;

module.exports = class Update {
    static get(db, req, res) {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        let mark = req.body.mark;
        if (mark === '' || mark === undefined) {
            mark = 'X';
        }
        const note = { place: req.body.place, description: req.body.body,
            mark: mark, time: details._id.getTimestamp() };
        db.collection('notes').update(details, note, (err) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(note);
                log.debug(note);

            }
        });
    }
};
