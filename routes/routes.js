'use strict';
const log = require('../libs/log')(module);

const ObjectID = require('mongodb').ObjectID;
module.exports = function (app, db) {
    app.get('/notes/:id', (req, res) => {

        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').find(details)
            .toArray((err, item) => {
                if (err) {
                    res.send({ 'error': 'An error has occurred' });
                } else {
                    res.send(item);
                    log.debug(item);
                    console.info(item);
                }
            });
    });


    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').find(details)
            .toArray((err, item) => {
                if (err) {
                    res.send({ 'error': 'An error has occurred' });
                } else {
                    res.send(item);
                    log.debug(item);
                }
            });
    });

    app.get('/notes', (req, res) => {
        console.info(req.query.sort);
        let sortObj = '';
        let sortType = req.query.sort;
        if (sortType === 'time') {
            sortObj = { time: 1 };
        } else if (sortType === 'alph') {
            sortObj = { description: -1 };
        }
        let search = req.query.query || '';
        let details = '';
        console.info(search);
        if (search === '') {
            details = {};
        } else {
            details = { 'description': search };
        }
        console.info(details);
        db.collection('notes').find(details)
            .sort(sortObj)
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
        const note = { place: req.body.place, description: req.body.body,
            mark: mark, time: details._id.getTimestamp() };
        db.collection('notes').insert(note, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
                log.debug(result.ops[0]);
            }
        });
    });


    app.copy('/notes', (req, res) => {
        let from = req.query.from;
        let to = req.query.to;
        db.collection('notes').find()
            .toArray((err, item) => {
                if (err) {
                    res.send({ 'error': 'An error has occurred' });

                } else if (from && to && item[to] && item[from]) {
                    let cache = item[to];
                    console.info(cache);
                    item[to] = item[from];
                    console.info(cache);
                    item[from] = cache;
                    res.send(item);
                    log.debug(item);
                } else {
                    res.send({ 'error': 'An error has occurred' });
                }
            });
    });

    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').remove(details, (err) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send('Note ' + id + ' deleted!');
            }
        });
    });

    app.put ('/notes/:id', (req, res) => {
        const id = req.params.id;
        console.info(req.query.from);
        console.info(req.query.to);
        const details = { '_id': new ObjectID(id) };
        let mark = req.body.mark;
        if (mark === '' || mark === undefined) {
            mark = 'X';
        }
        const note = { place: req.body.place, description: req.body.body,
            mark: mark, time: details._id.getTimestamp() };
        db.collection('notes').update(details, note, (err) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(note);
                log.debug(note);

            }
        });
    });
};
