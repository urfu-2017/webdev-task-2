'use strict';

const Place = require('../../models/place');
const Controller = require('../../utils/controller');

module.exports = class extends Controller {
    get() {
        const { sort, page, limit } = this.query;
        const options = { page: Number(page) || 0, limit: Number(limit), sort };
        this.json(Place.find({ visited: true }, options));
    }

    post() {
        this.json(Place.visit(this.body.id));
    }
};
