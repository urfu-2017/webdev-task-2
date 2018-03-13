'use strict';
const log = require('../libs/log')(module);

const ObjectID = require('mongodb').ObjectID;
module.exports = function (app, db) {
    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(item);
                log.debug(item);
            }
        });
    });

    app.get('/notes', (req, res) => {
        db.collection('notes').find()
            .sort({ time: -1 })
            .toArray((err, item) => {
                if (err) {
                    res.send({ 'error': 'An error has occurred' });
                } else {
                    res.send(item);
                    log.debug(item);

                }
            });
    });

    app.purge('/notes', (req, res) => {
        db.collection('notes').remove((err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(item);
                log.debug(item);

            }
        });
    });

    app.post('/notes', (req, res) => {
        let mark = req.body.mark;
        if (mark === '' || mark === undefined) {
            mark = 'X';
        }
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const note = { description: req.body.body, mark: mark, time: details._id.getTimestamp() };
        db.collection('notes').insert(note, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
                log.debug(result.ops[0]);
            }
        });
    });

    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').remove(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send('Note ' + id + ' deleted!');
            }
        });
    });

    app.put ('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        let mark = req.body.mark;
        const note = { description: req.body.body, mark: mark, time: details._id.getTimestamp() };
        db.collection('notes').update(details, note, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(note);
                log.debug(note);

            }
        });
    });
};
