'use strict';

const Place = require('../../models/place');
const Controller = require('../../utils/controller');

module.exports = class extends Controller {
    get() {
        const { sort, page, limit } = this.query;
        this.json(Place.find(sort, Number(page), Number(limit), { visited: true }));
    }

    post() {
        this.json(Place.visit(this.body.id));
    }
};
