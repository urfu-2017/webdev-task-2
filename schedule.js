'use strict';

function sortByParam(param) {
    return (a, b) => {
        if (a[param] < b[param]) {
            return -1;
        }
        if (a[param] > b[param]) {
            return 1;
        }

        return 0;
    };
}

class Schedule {
    constructor() {
        this.schedule = [];
    }

    get list() {
        return this.schedule;
    }

    add(place) {
        this.schedule.push(place);
    }

    sortBy(method) {
        if (method === 'date') {
            this.schedule.sort(sortByParam('creationDate'));
        }
        if (method === 'name') {
            this.schedule.sort(sortByParam('name'));
        }
    }

    find(name) {
        return this.schedule.filter(elem => elem.name === name);
    }

    changeName(oldName, newName) {
        let index = this.schedule.findIndex(elem => elem.name === oldName);
        this.schedule[index].name = newName;
    }

    mark(name, flag) {
        let index = this.schedule.findIndex(elem => elem.name === name);
        this.schedule[index].mark(flag);
    }

    delete(place) {
        this.schedule = this.schedule.filter(elem => elem.name !== place);
    }

    swap(name1, name2) {
        let index1 = this.schedule.findIndex(elem => elem.name === name1);
        let index2 = this.schedule.findIndex(elem => elem.name === name2);

        let temp = this.schedule[index1];
        this.schedule[index1] = this.schedule[index2];
        this.schedule[index1] = temp;
    }

    clear() {
        this.schedule = [];
    }
}

module.exports = new Schedule();
