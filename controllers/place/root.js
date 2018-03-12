'use strict';

const Place = require('../../models/place');
const Controller = require('../../utils/controller');

module.exports = class extends Controller {
    get() {
        const { description, sort, page, limit } = this.query;
        const options = description ? { description } : {};
        this.json(Place.find(sort, Number(page), Number(limit), options));
    }

    post() {
        this.json(Place.create(this.body.description));
    }

    put() {
        this.json(Place.replace(this.body));
    }

    delete() {
        this.json(Place.clear());
    }
};
