'use strict';

const log = require('../libs/log')(module);

module.exports = class Post {
    static get(db, note, res) {
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
