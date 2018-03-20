'use strict';

const storage = require('../models/placeStorage');

class Places {
    static search({ sort, start, count, description }) {
        return storage.search(sort, start, count, description);
    }

    static append({ description }) {
        storage.append(description);
    }

    static find(id) {
        return storage.find(id);
    }

    static edit(targetPlace, params) {
        storage.edit(targetPlace, params);
    }

    static delete(id) {
        storage.delete(id);
    }

    static deleteAll() {
        storage.deleteAll();
    }
}

module.exports = Places;
