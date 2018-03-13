'use strict';

module.exports = (req, res, next) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.sendStatus(400);
    }

    req.params.id = id;
    next();
};
