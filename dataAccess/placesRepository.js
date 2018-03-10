'use strict';

const storage = [];
let currentIdx = 0;

class PlacesRepository {
    getAll(skip, take) {
        skip = skip || 0;
        take = take || Number.MAX_SAFE_INTEGER;

        return storage.slice(skip, skip + take);
    }
    get(id) {
        return storage.find(p => p.id === id);
    }
    find(description) {
        return storage.find(p => p.description.toLowerCase().includes(description.toLowerCase()));
    }
    save(place) {
        let placeIndex = storage.findIndex(p => p.id === place.id);
        if (placeIndex < 0) {
            placeIndex = storage.length;
            place.id = this.generateId();
        }
        storage[placeIndex] = place;

        return place.id;
    }
    delete(id) {
        const placeIndex = storage.findIndex(p => p.id === id);
        if (placeIndex < 0) {
            return;
        }
        storage.splice(placeIndex, 1);
    }
    deleteAll() {
        storage.splice(0, storage.length);
    }
    generateId() {
        currentIdx += 1;

        return currentIdx;
    }
}

module.exports = PlacesRepository;
