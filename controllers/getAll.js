'use strict';
const placesData = require('../models/place');

class Fetch {
    static async getAll(req, res) {
        const { sort, search } = req.query;
        const places = await placesData.getAll(sort, search);
        res.send(places);
    }

    static async post(req, res) {
        const { id } = req.params;
        const { mark, place, body: description } = req.body;
        const places = await placesData.create(mark, id, place, description);
        res.send(places);
    }

    static async find(req, res) {
        const { id } = req.params;
        const places = await placesData.find(id);
        res.send(places);
    }

    static async purge(res) {
        await placesData.deleteAll();
        res.send('Deleted');
    }

    static async remove(req, res) {
        const { id } = req.params;
        await placesData.remove(id);
        res.send(`Note ${id} deleted!`);
    }

    static async update(req, res) {
        const { id } = req.params;
        const { mark, place, body: description } = req.body;
        await placesData.update(id, mark, place, description);
        res.send(`Updated ${id}`);
    }

    static swap(req, res) {
        res.send('Done');

        return placesData.swap(res, req);
    }

}

module.exports = Fetch;
