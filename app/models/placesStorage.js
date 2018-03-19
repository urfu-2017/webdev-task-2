'use strict';

const LokiDb = require('lokijs');
const Place = require('./place');
const shuffleArray = require('shuffle-array');

class PlacesStorage {
    constructor(dbName) {
        this._storage = new LokiDb(dbName);
        this.places = this._storage.addCollection('places');
    }

    add(place) {
        this.places.insert(place);
    }

    deleteAll() {
        this.places.clear();
    }

    getList({ limit, offset, sortKey }) {
        let sortingKey = sortKey || '$loki';
        sortingKey = sortingKey === 'date' ? 'meta.created' : sortingKey;

        return this.places.chain()
            .simplesort(sortingKey)
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

    getById(placeId) {
        const placeRecord = this.places.get(placeId);

        return placeRecord !== null ? new Place(placeRecord) : null;
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
            place.isVisited = mark;
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

module.exports = new PlacesStorage();
