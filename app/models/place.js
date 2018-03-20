'use strict';

const LokiDb = require('lokijs');

const _storage = new LokiDb();
const _places = _storage.addCollection('places');

class Place {
    constructor({ description, isVisited }) {
        this.isVisited = isVisited || false;
        this.description = description;
    }

    static trySwap(placeIndex1, placeIndex2) {
        if (placeIndex1 >= _places.data.length || placeIndex2 >= _places.data.length) {
            return false;
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

        return placeRecord !== null ? new Place(placeRecord) : null;
    }

    static tryDeletePlace(placeId) {
        const place = _places.find({ '$loki': placeId });
        if (place.length !== 1) {
            return false;
        }

        _places.remove(place);

        return true;
    }

    static tryUpdateDescription(id, description) {
        return Place._tryUpdateValue(id, place => {
            place.description = description || place.description;
        });
    }

    static tryUpdateMark(id, mark) {
        return Place._tryUpdateValue(id, place => {
            place.isVisited = mark;
        });
    }

    static _tryUpdateValue(id, updateFunc) {
        let isUpdated = false;
        _places.findAndUpdate({ '$loki': id },
            place => {
                isUpdated = true;
                updateFunc(place);
            }
        );

        return isUpdated;
    }

    static findByDescription(description) {
        return _places.chain()
            .find({ description })
            .map(x => new Place(x));
    }
}

module.exports = Place;
