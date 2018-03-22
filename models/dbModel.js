'use strict';

const dbConnect = require('../libs/dbInit');
const log = require('../libs/log')(module);
const ObjectID = require('mongodb').ObjectID;

class Place {
    static async getAll(sortBy, searchOf) {
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

        return db.collection('notes')
            .find(details)
            .sort(sortObj)
            .toArray()
            .catch(err => log.debug(err));
    }


    static async find(id) {
        const dbConnection = await dbConnect();
        const db = dbConnection.db('notes');
        const details = { '_id': new ObjectID(id) };

        return db.collection('notes').find(details)
            .toArray()
            .catch(err => log.debug(err));
    }

    static async postAll(mark, id, place, descr) {
        const dbConnection = await dbConnect();
        const db = dbConnection.db('notes');
        mark = !(mark === '' || mark === undefined);
        const details = { '_id': new ObjectID(id) };
        const note = {
            place: place, description: descr,
            mark: mark, time: details._id.getTimestamp()
        };

        return db.collection('notes').insert(note)
            .catch(err => log.debug(err));
    }

    static async copy(res, req) {
        const dbConnection = await dbConnect();
        const db = dbConnection.db('notes');
        let from = req.query.from;
        let to = req.query.to;

        return db.collection('notes')
            .find()
            .toArray()
            .then(item =>{
                if (from && to && item[to] && item[from]) {
                    let cache = item[to];
                    item[to] = item[from];
                    log.debug(cache);
                    item[from] = cache;
                    res.send(item);
                    log.debug(item);
                }
            })
            .catch(err => log.debug(err));
    }


    static async deleteAll() {
        const dbConnection = await dbConnect();
        const db = dbConnection.db('notes');

        return db.collection('notes').remove()
            .catch(err => log.debug(err));

    }


    static async remove(id) {
        const dbConnection = await dbConnect();
        const db = dbConnection.db('notes');
        const details = { '_id': new ObjectID(id) };

        return db.collection('notes').remove(details)
            .catch(err => log.debug(err));

    }


    static async update(id, mark, place, descr) {
        const dbConnection = await dbConnect();
        const db = dbConnection.db('notes');
        const details = { '_id': new ObjectID(id) };
        if (mark === '' || mark === undefined) {
            mark = false;
        }
        const note = {
            place: place, description: descr,
            mark: mark, time: details._id.getTimestamp()
        };

        return db.collection('notes').update(details, note)
            .catch(err => log.debug(err));

    }
}
module.exports = Place;
