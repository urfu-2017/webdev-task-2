'use strict';

const storage = [];
const orders = {};
let currentIdx = 0;

class PlacesRepository {
    getAll(skip, take) {
        skip = skip || 0;
        take = take || Number.MAX_SAFE_INTEGER;

        return storage.sort((a, b) => orders[a.id] - orders[b.id]).slice(skip, skip + take);
    }
    get(id) {
        return storage.find(p => p.id === id);
    }
    find(description) {
        return storage.find(p => p.description.toLowerCase().includes(description.toLowerCase()));
    }
    save(place, order) {
        place.id = parseInt(place.id);
        let placeIndex = storage.findIndex(p => p.id === place.id);
        if (placeIndex < 0) {
            placeIndex = storage.length;
            place.id = this.generateId();
        }
        storage[placeIndex] = place;
        this.setOrder(place, order);

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
    setOrder(place, order) {
        const maxOrder = Math.max.apply(null, Object.values(orders));
        if (maxOrder < 1) {
            order = 1;
        }
        order = order && parseInt(order) || maxOrder + 1;
        Object.keys(orders).forEach(id => {
            if (orders[id] >= order) {
                orders[id] += order < orders[place.id] ? 1 : -1;
            }
        });
        orders[place.id] = order;
    }
}

module.exports = PlacesRepository;
