'use strict';

module.exports = (req, res, next) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.status(400).send('failed parsing id to int');
    }

    req.params.id = id;
    next();
};
