'use strict';

const log = require('../libs/log')(module);

module.exports = class Search {
    static cop(db, res, req) {
        let from = req.query.from;
        let to = req.query.to;
        db.collection('notes').find()
            .toArray((err, item) => {
                if (err) {
                    res.send({ 'error': 'An error has occurred' });
                } else if (from && to && item[to] && item[from]) {
                    let cache = item[to];
                    item[to] = item[from];
                    log.debug(cache);
                    item[from] = cache;
                    res.send(item);
                    log.debug(item);
                }
            });
    }
};
