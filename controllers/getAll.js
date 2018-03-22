'use strict';
const base = require('../models/place');

class Fetch {
    static async getAll(req, res) {
        const { sort, search } = req.query;
        const places = await base.getAll(sort, search);
        res.send(places);
    }

    static async post(req, res) {
        const mark = req.body.mark;
        const id = req.params.id;
        const placeBody = req.body.place;
        const descr = req.body.body;
        const places = await base.postAll(mark, id, placeBody, descr);
        res.send(places);
    }

    static async find(req, res) {
        const id = req.params.id;
        const places = await base.find(id);
        res.send(places);
    }

    static async purge(res) {
        await base.deleteAll();
        res.send('Deleted');
    }

    static async remove(req, res) {
        const id = req.params.id;
        await base.remove(id);
        res.send('Note ' + id + ' deleted!');
    }

    static async update(req, res) {
        const id = req.params.id;
        let mark = req.body.mark;
        const place = req.body.place;
        const descr = req.body.body;
        await base.update(id, mark, place, descr);
        res.send(id + 'Updated');
    }

    static copy(req, res) {

        return base.copy(res, req);
    }

}

module.exports = Fetch;
