'use strict';

const storage = [];
const orders = {};
let currentId = 0;

class PlacesRepository {
    getAll(skip, take, description) {
        skip = skip || 0;
        take = take || Number.MAX_SAFE_INTEGER;

        return this.find(description).sort((a, b) => orders[a.id] - orders[b.id])
            .slice(skip, skip + take);
    }
    get(id) {
        return storage.find(p => p.id === id);
    }
    find(description) {
        description = description || '';
        return storage.filter(p => p.description.toLowerCase().includes(description.toLowerCase()));
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
        currentId += 1;

        return currentId;
    }
    setOrder(place, order) {
        const maxOrder = Math.max.apply(null, Object.values(orders));
        if (maxOrder < 1) {
            order = 1;
        }
        order = order && parseInt(order) || maxOrder + 1;
        this.updateOrders(place, order);
    }

    updateOrders(place, order) {
        Object.keys(orders).forEach(id => {
            if (orders[id] >= order) {
                orders[id] += order < orders[place.id] ? 1 : -1;
            }
        });
        orders[place.id] = order;
    }
}

module.exports = PlacesRepository;
