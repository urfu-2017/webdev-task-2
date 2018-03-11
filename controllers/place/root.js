'use strict';

const Place = require('../../models/place');
const Controller = require('../../utils/controller');

module.exports = class extends Controller {
    get() {
        const { description, sort, page, limit } = this.query;
        this.json(Place.find(description, sort, parseInt(page), parseInt(limit)));
    }

    post() {
        this.json(new Place(this.body.description).save());
    }

    put() {
        this.json(Place.replace(this.body));
    }

    delete() {
        this.json(Place.clear());
    }
};
