'use strict';

const log = require('../libs/log')(module);

module.exports = class GetAll {
    static get(db, details, sortObj, res) {
        db.collection('notes').find(details)
            .sort(sortObj)
            .toArray((err, item) => {
                if (err) {
                    res.send({ 'error': 'An error has occurred' });
                } else {
                    res.send(item);
                    log.debug(item);

                }
            }
            );
    }
};
