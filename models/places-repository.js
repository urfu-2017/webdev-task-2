'use strict';

let places = [];

class PlacesRepository {
    static insert(place) {
        places.push(place);
    }

    static clear() {
        places = [];
    }

    static getAll(orderBy, offset, limit) {
        const result = places.slice(0);
        if (orderBy !== null) {
            result.sort(x => x[orderBy]);
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
        const curPos = places.indexOf(place);
        const newPos = curPos + offset;
        const isOutOfRange = (newPos < 0 || newPos >= places.length);
        if (isOutOfRange) {
            return false;
        }
        places.splice(curPos, 1);
        places.splice(newPos, 0, place);

        return true;

    }
}

module.exports = PlacesRepository;
