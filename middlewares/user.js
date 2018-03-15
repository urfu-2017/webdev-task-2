'use strict';

module.exports = (req, res, next) => {
    if (!req.query.user) {
        req.query.user = 'admin';
    }

    next();
};
