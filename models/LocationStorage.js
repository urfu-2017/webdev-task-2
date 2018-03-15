'use strict';

const arr = [];

const getIdx = name => arr.slice().map(elem => elem.name)
    .indexOf(name);

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
            arr.splice(0, arr.length);

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
        const firstIdx = getIdx(name1);
        const secondIdx = getIdx(name2);
        if (firstIdx !== -1 && secondIdx !== -1) {
            arr[firstIdx] = arr.splice(secondIdx, 1, arr[firstIdx])[0];

            return true;
        }

        return false;
    }
}

module.exports = LocationStorage;
