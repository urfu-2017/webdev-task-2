'use strict';

const log = require('../libs/log')(module);

module.exports = class Search {
    static Get(db, details, res) {
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
