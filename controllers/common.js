'use strict';

exports.options = (req, res) => {
    res.set('Allow', 'OPTIONS, GET, POST, PATCH, PUT, DELETE');
    res.sendStatus(200);
};

exports.error404 = (req, res) => {
    res.sendStatus(404);
};
