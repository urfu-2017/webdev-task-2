'use strict';

const dbConnect = require('../libs/dbInit');
const log = require('../libs/log')(module);
const ObjectID = require('mongodb').ObjectID;

class Place {
    static async getAll(sortBy, searchOf, res) {
        const dbConnection = await dbConnect();
        const db = dbConnection.db('notes');
        let sortObj = '';
        let sortType = sortBy;
        if (sortType === 'time') {
            sortObj = { time: -1 };
        } else if (sortType === 'alph') {
            sortObj = { description: -1 };
        }
        let search = searchOf || '';
        let details = '';
        if (search === '') {
            details = {};
        } else {
            details = { 'description': search };
        }
        db.collection('notes')
            .find(details)
            .sort(sortObj)
            .toArray((err, item) => {
                console.error(err);
                res.send(item);
            });
    }


    static async find(req, res) {
        const dbConnection = await dbConnect();
        const db = dbConnection.db('notes');
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
    }

    static async postAll(req, res) {
        const dbConnection = await dbConnect();
        const db = dbConnection.db('notes');
        let mark = req.body.mark;
        mark = !(mark === '' || mark === undefined);
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const note = {
            place: req.body.place, description: req.body.body,
            mark: mark, time: details._id.getTimestamp()
        };
        db.collection('notes').insert(note, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
                log.debug(result.ops[0]);
            }
        });
    }

    static async copy(res, req) {
        const dbConnection = await dbConnect();
        const db = dbConnection.db('notes');
        let from = req.query.from;
        let to = req.query.to;
        db.collection('notes').find()
            .toArray((err, item) => {
                if (err) {
                    res.send({ 'error': 'An error has occurred' });
                } else if (from && to && item[to] && item[from]) {
                    let cache = item[to];
                    item[to] = item[from];
                    log.debug(cache);
                    item[from] = cache;
                    res.send(item);
                    log.debug(item);
                }
            });
    }

    static async deleteAll(res) {
        const dbConnection = await dbConnect();
        const db = dbConnection.db('notes');
        db.collection('notes').remove((err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(item);
                log.debug(item);

            }
        });
    }

    static async remove(req, res) {
        const dbConnection = await dbConnect();
        const db = dbConnection.db('notes');
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').remove(details, (err) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send('Note ' + id + ' deleted!');
            }
        });
    }

    static async update(req, res) {
        const dbConnection = await dbConnect();
        const db = dbConnection.db('notes');
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        let mark = req.body.mark;
        if (mark === '' || mark === undefined) {
            mark = false;
        }
        const note = {
            place: req.body.place, description: req.body.body,
            mark: mark, time: details._id.getTimestamp()
        };
        db.collection('notes').update(details, note, (err) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(note);
                log.debug(note);

            }
        });
    }
}
module.exports = Place;
