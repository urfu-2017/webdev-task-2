'use strict';

module.exports = (req, res, next) => {
    if (req.query.oldIndex !== undefined && req.query.newIndex !== undefined) {
        req.query.oldIndex = parseInt(req.query.oldIndex);
        req.query.newIndex = parseInt(req.query.newIndex);
    }

    if (!_isValidQuery(req.query)) {
        res.sendStatus(400);

        return;
    }

    next();
};

function _isValidQuery(query) {
    return typeof query.oldIndex === 'number' && typeof query.newIndex === 'number';
}
