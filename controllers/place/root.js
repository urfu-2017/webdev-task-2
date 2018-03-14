'use strict';

const Place = require('../../models/place');
const Controller = require('../../utils/controller');

module.exports = class extends Controller {
    get() {
        const { description, sort, page, limit } = this.query;
        const query = description ? { description } : {};
        const options = { page: page ? Number(page) : 0, limit: Number(limit), sort };
        this.json(Place.find(query, options));
    }

    post() {
        this.json(Place.create(this.body.description));
    }

    put() {
        this.json(Place.updateById(this.body.id, this.body));
    }

    delete() {
        this.json(Place.removeAll());
    }
};
