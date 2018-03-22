'use strict';
const log = require('../libs/log')(module);
const mainController = require('../controllers/getAll');


module.exports = function (app) {

    app.get('/notes/:id', async (req, res) =>await mainController.find(req, res));

    app.get('/notes', async (req, res) => await mainController.getAll(req, res));

    app.delete('/notes', async (req, res) => await mainController.purge(res));

    app.post('/notes', async (req, res) => await mainController.post(req, res));

    app.put('/notes', async (req, res) => await mainController.swap(req, res));

    app.delete('/notes/:id', async (req, res) => await mainController.remove(req, res));

    app.put('/notes/:id', async (req, res) => await mainController.update(req, res));

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
