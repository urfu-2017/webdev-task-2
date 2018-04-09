'use strict';

class PlacesStore {
    constructor() {
        this.list = [];
    }

    get() {
        return [...this.list];
    }

    getByName(placeName) {
        return this.list.find(({ name }) => name === placeName);
    }

    add(place) {
        let isAlreadyAdded = Boolean(this.list.find(({ name }) => name === place.name));
        if (isAlreadyAdded) {
            return false;
        }

        this.list.push(place);

        return place;
    }

    deleteByName(placeName) {
        let indexToDelete = this.list.findIndex(({ name }) => name === placeName);
        if (indexToDelete === -1) {
            return false;
        }

        this.list.splice(indexToDelete, 1);

        return true;
    }

    deleteAll() {
        this.list = [];
    }

    moveTo(placeName, indexTo) {
        let indexFrom = this.list.findIndex(({ name }) => name === placeName);

        if (indexTo !== undefined) {
            this.list.splice(indexTo, 0, this.list.splice(indexFrom, 1)[0]);

            return true;
        }

        return false;
    }

    update(placeName, data) {
        let placeToUpdate = this.list.find(({ name }) => name === placeName);

        if (!placeToUpdate) {
            return false;
        }
        // Для простоты считаем, что поля переданы корректно
        Object.assign(placeToUpdate, data);

        return true;
    }
}

module.exports = new PlacesStore();
