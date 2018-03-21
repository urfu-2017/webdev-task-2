'use strict';

module.exports = (req, res, next) => {
    if (req.query.offset !== undefined && req.query.limit !== undefined) {
        req.query.offset = parseInt(req.query.offset);
        req.query.limit = parseInt(req.query.limit);
    }

    if (!isValidQuery(req.query)) {
        res.status(400).send('failed oldIndex and newIndex parsing to int');

        return;
    }

    next();
};


function isValidSortQuery(sort) {
    return sort === undefined || sort === 'date' || sort === 'description';
}

function isValidQuery(query) {
    return (query.offset === undefined || typeof query.offset === 'number') &&
           (query.limit === undefined || typeof query.limit === 'number') &&
            isValidSortQuery(query.sort);
}
