'use strict';

const log = require('../libs/log')(module);
const ObjectID = require('mongodb').ObjectID;

module.exports = class Search {
    static get(db, req, res) {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').find(details)
            .toArray((err, item) => {
                if (err) {
                    res.send({ 'error': 'An error has occurred' });
                } else {
                    res.send(item);
                    log.debug(item);
                }
            });
    }

};
