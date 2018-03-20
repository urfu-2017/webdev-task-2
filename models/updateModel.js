'use strict';

const log = require('../libs/log')(module);

module.exports = class Update {
    static get(db, details, note, res) {
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
