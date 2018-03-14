'use strict';

const places = [];
let id = 0;

class Storage {
    static search(query) {
        return places;
    }

    static append(place) {
        places.push(Object.assign({}, place, { visited: false, id: id++ }));
    }
}

module.exports = Storage;
