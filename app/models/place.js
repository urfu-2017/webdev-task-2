'use strict';

const LokiDb = require('lokijs');

const _storage = new LokiDb();
const _places = _storage.addCollection('places');

class Place {
    constructor({ description, isVisited }) {
        this.isVisited = isVisited || false;
        this.description = description;
    }

    static swap(placeIndex1, placeIndex2) {
        if (placeIndex1 >= _places.data.length || placeIndex2 >= _places.data.length) {
            throw Error('one of the index is out of range');
        }
        const savedPlace = _places.data[placeIndex1];
        _places.data[placeIndex1] = _places.data[placeIndex2];
        _places.data[placeIndex2] = savedPlace;

        return true;
    }

    static add(place) {
        _places.insert(place);
    }

    static deleteAll() {
        _places.clear();
    }

    static getList({ limit, offset, sortKey }) {
        const sortingKey = sortKey === 'date' ? 'meta.created' : sortKey;
        let places = _places.chain();
        if (typeof sortingKey === 'string') {
            places = places.simplesort(sortingKey);
        }

        return places.offset(offset)
            .limit(limit)
            .data()
            .map(x => new Place(x));
    }

    static getById(placeId) {
        const placeRecord = _places.get(placeId);
        if (placeRecord === null) {
            throw Error(`place with id = ${placeId} doesn't exist`);
        }

        return new Place(placeRecord);
    }

    static deletePlace(placeId) {
        const place = _places.find({ '$loki': placeId });
        if (place.length !== 1) {
            throw Error(`place with id = ${placeId} doesn't exist`);
        }

        _places.remove(place);
    }

    static UpdateDescription(id, description) {
        return Place.updateValue(id, place => {
            place.description = description || place.description;
        });
    }

    static updateMark(id, mark) {
        return Place.updateValue(id, place => {
            place.isVisited = mark;
        });
    }

    static updateValue(id, updateFunc) {
        let isUpdated = false;
        _places.findAndUpdate({ '$loki': id },
            place => {
                isUpdated = true;
                updateFunc(place);
            }
        );

        if (!isUpdated) {
            throw Error(`place with id = ${id} doesn't exist`);
        }
    }

    static find(query) {
        return _places.data
            .filter(place => place.description.includes(query))
            .map(x => new Place(x));
    }
}

module.exports = Place;
