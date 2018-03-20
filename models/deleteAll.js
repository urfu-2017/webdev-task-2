/* eslint-disable linebreak-style */
'use strict';

const log = require('../libs/log')(module);

module.exports = class deleteAll {
    static all(db, res) {
        db.collection('notes').remove((err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(item);
                log.debug(item);

            }
        });
    }
};
