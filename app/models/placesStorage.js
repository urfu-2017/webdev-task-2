'use strict';

const LokiDb = require('lokijs');
const Place = require('./place');
const shuffleArray = require('shuffle-array');

class PlacesStorage {
    constructor(dbName) {
        this._storage = new LokiDb(dbName);
        this.places = this._storage.addCollection('places');
    }

    getList({ limit, offset, sortKey }) {
        sortKey = sortKey || '$loki';
        sortKey = sortKey === 'date' ? 'meta.created' : sortKey;

        return this.places.chain()
            .simplesort(sortKey)
            .offset(offset)
            .limit(limit)
            .data()
            .map(x => new Place(x));
    }

    shuffle() {
        const shuffledIds = shuffleArray([...Array(this.places.count()).keys()]);
        this.places.updateWhere(() => true, place => {
            place.$loki = shuffledIds[place.$loki - 1] + 1;

            return place;
        });
    }

    getPlace(placeId) {
        return this._storage[placeId];
    }

    tryDeletePlace(placeId) {
        const place = this.places.find({ '$loki': placeId });
        if (place.length !== 1) {
            return false;
        }
        this.places.remove(place);

        return true;
    }

    tryUpdateDescription(id, description) {
        return this._tryUpdateValue(id, place => {
            place.description = description || place.description;
        });
    }

    tryUpdateMark(id, mark) {
        return this._tryUpdateValue(id, place => {
            place.isVisited = mark || place.isVisited;
        });
    }

    _tryUpdateValue(id, updateFunc) {
        let isUpdated = false;
        this.places.findAndUpdate({ '$loki': id },
            place => {
                isUpdated = true;
                updateFunc(place);
            }
        );

        return isUpdated;
    }

    findByDescription(description) {
        return this.places.chain()
            .find({ description })
            .map(x => new Place(x));
    }
}

module.exports = PlacesStorage;
