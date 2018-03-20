'use strict';

let places = [];

function buildComparatorBy(orderingKey) {
    return function (a, b) {
        if (a[orderingKey] < b[orderingKey]) {
            return -1;
        }
        if (a[orderingKey] > b[orderingKey]) {
            return 1;
        }

        return 0;
    };
}

class PlacesRepository {
    static insert(place) {
        places.push(place);
    }

    static clear() {
        places = [];
    }

    static getAll(orderingKey, offset, limit) {
        const result = places.slice(0);
        if (orderingKey !== null) {
            result.sort(buildComparatorBy(orderingKey));
        }

        return places.slice(offset, offset + limit);
    }

    static findById(id) {
        return places.find(x => x.id === id);
    }

    static remove(place) {
        places = places.filter(x => x === place);
    }

    static tryMove(place, offset) {
        const currentPosition = places.indexOf(place);
        const newPosition = currentPosition + offset;
        const isOutOfRange = (newPosition < 0 || newPosition >= places.length);
        if (isOutOfRange) {
            return false;
        }
        places.splice(currentPosition, 1);
        places.splice(newPosition, 0, place);

        return true;

    }
}

module.exports = PlacesRepository;
