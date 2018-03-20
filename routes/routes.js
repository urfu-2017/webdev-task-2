'use strict';
const log = require('../libs/log')(module);
const find = require('../controllers/find');
const posts = require('../controllers/post');
const getAll = require('../controllers/getAll');
const purgeAll = require('../controllers/purge');
const copyPlace = require('../controllers/copy');
const removePlace = require('../controllers/remove');
const updatePlace = require('../controllers/update');

module.exports = function (app, db) {

    app.get('/notes/:id', async (req, res) =>await find(req, res, db));

    app.get('/notes', async (req, res) => await getAll(req, res, db));

    app.purge('/notes', async (req, res) => await purgeAll(req, res, db));

    app.post('/notes', async (req, res) => await posts(req, res, db));

    app.copy('/notes', async (req, res) => await copyPlace(req, res, db));

    app.delete('/notes/:id', async (req, res) => await removePlace(req, res, db));

    app.put ('/notes/:id', async (req, res) => await updatePlace(req, res, db));

    app.get('/ping', function (req, res) {
        res.send('API is running');
    });

    app.use(function (req, res) {
        res.status(404);
        log.debug('Not found URL: %s', req.url);
        res.send({ error: 'Not found' });

        return;
    });
};
