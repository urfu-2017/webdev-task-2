'use strict';

module.exports = (req, res, next) => {
    if (req.query.offset !== undefined && req.query.limit !== undefined) {
        req.query.offset = parseInt(req.query.offset);
        req.query.limit = parseInt(req.query.offset);
    }

    if (!isValidQuery(req.query)) {
        res.sendStatus(400);

        return;
    }

    next();
};


function isValidSortQuery(sort) {
    return sort === undefined || sort === 'date' || sort === 'description';
}

function isValidQuery(query) {
    return (query.offset === undefined || typeof query.offset === 'string') &&
           (query.limit === undefined || typeof query.limit === 'string') &&
            isValidSortQuery(query.sort);
}
