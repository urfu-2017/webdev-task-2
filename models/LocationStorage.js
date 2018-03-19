'use strict';

let arr = [];

class LocationStorage {
    push(element) {
        arr.push(element);
    }

    has(name) {
        return arr.find(elem => elem.name === name);
    }

    get(field, value) {
        if (!field) {
            return arr;
        }

        return arr.filter(elem => elem[field].includes(value));
    }

    delete(name) {
        let success = false;
        if (!name) {
            arr = [];

            return true;
        }
        arr.forEach((elem, idx) => {
            if (elem.name === name) {
                arr.splice(idx, 1);

                success = true;
            }
        });

        return success;
    }

    update(name, field, newValue) {
        let success = false;
        arr.forEach(elem => {
            if (elem.name === name) {
                elem[field] = newValue;

                success = true;
            }
        });

        return success;
    }

    swap(name1, name2) {
        const firstIdx = arr.findIndex(({ name }) => name === name1);
        const secondIdx = arr.findIndex(({ name }) => name === name2);
        if (firstIdx !== -1 && secondIdx !== -1) {
            arr[firstIdx] = arr.splice(secondIdx, 1, arr[firstIdx])[0];

            return true;
        }

        return false;
    }
}

module.exports = LocationStorage;
