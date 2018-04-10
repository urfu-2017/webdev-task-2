'use strict';

class PlacesStore {
    constructor() {
        this.list = [];
    }

    get() {
        return [...this.list];
    }

    getById(placeId) {
        return this.list.find(({ id }) => id === placeId);
    }

    add(place) {
        let isAlreadyAdded = Boolean(this.list.find(({ name }) => name === place.name));
        if (isAlreadyAdded) {
            return false;
        }

        this.list.push(place);

        return place;
    }

    deleteById(placeId) {
        let indexToDelete = this.list.findIndex(({ id }) => id === placeId);
        if (indexToDelete === -1) {
            return false;
        }

        this.list.splice(indexToDelete, 1);

        return true;
    }

    deleteAll() {
        this.list = [];
    }

    moveTo(placeId, indexTo) {
        let indexFrom = this.list.findIndex(({ id }) => id === placeId);

        if (indexTo !== undefined) {
            this.list.splice(indexTo, 0, this.list.splice(indexFrom, 1)[0]);

            return true;
        }

        return false;
    }

    update(placeId, data) {
        let placeToUpdate = this.getById(placeId);

        if (!placeToUpdate) {
            return false;
        }
        // Для простоты считаем, что поля переданы корректно
        Object.assign(placeToUpdate, data);

        return true;
    }
}

module.exports = new PlacesStore();
