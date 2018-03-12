'use strict';

const Place = require('../../models/place');
const Controller = require('../../utils/controller');

module.exports = class extends Controller {
    get() {
        this.json(Place.findById(Number(this.params.id)));
    }

    put() {
        this.json(Place.swap(Number(this.params.id), Number(this.body.id)));
    }

    delete() {
        this.json(Place.removeById(Number(this.params.id)));
    }
};
