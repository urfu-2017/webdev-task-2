'use strict';

/* eslint-disable-next-line no-unused-vars*/
module.exports = (err, req, res, next) => {
    /* eslint-disable-next-line no-console*/
    console.error(err);
    res.status(err.status).send(err.message);
};
