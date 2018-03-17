'use strict';

const Query = require('../classes/Query');

const storage = [];

class Place {
    constructor(name, description) {
        this.name = name;
        this.description = description;
        this.visited = false;
        this.date = Date.now();
    }

    save() {
        storage.push(this);
    }

    static swap(name1, name2) {
        let index1 = storage.findIndex(place => place.name === name1);
        let index2 = storage.findIndex(place => place.name === name2);

        if (index1 !== -1 && index2 !== -1) {
            [storage[index1], storage[index2]] = [storage[index2], storage[index1]];
        }
    }

    static add(name, description) {
        let place = new this(name, description);
        place.save();

        return place;
    }

    static find(obj = {}) {
        if (!Object.keys(obj).length) {
            return new Query(storage, storage);
        }

        return new Query(
            storage,
            storage.filter(place => {
                for (let key in obj) {
                    if (place[key] !== obj[key]) {
                        return false;
                    }
                }

                return true;
            })
        );
    }
}

module.exports = Place;
