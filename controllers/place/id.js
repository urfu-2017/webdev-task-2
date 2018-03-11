'use strict';

const Place = require('../../models/place');
const Controller = require('../../utils/controller');

module.exports = class extends Controller {
    get() {
        this.json(Place.findById(parseInt(this.params.id)));
    }

    put() {
        this.json(Place.swap(parseInt(this.params.id), parseInt(this.body.id)));
    }

    delete() {
        this.json(Place.findByIdAndRemove(parseInt(this.params.id)));
    }
};
