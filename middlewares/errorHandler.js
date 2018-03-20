'use strict';

/* eslint-disable-next-line no-unused-vars*/
exports.error = (err, req, res, next) => {
    res.set('Allow', 'OPTIONS, GET, POST, PATCH, PUT, DELETE');
    /* eslint-disable-next-line no-console*/
    // console.log(err);
    res.status(err.status).send(err.message);
};
