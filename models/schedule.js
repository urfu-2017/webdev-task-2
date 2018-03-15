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

module.exports = class Schedule {
    constructor() {
        this.schedule = [];
    }

    add(place) {
        this.schedule.push(place);
    }

    getList() {
        return this.schedule;
    }

    sortByDate() {
        this.schedule.sort(sortByParam('creationDate'));
    }

    sortByName() {
        this.schedule.sort(sortByParam('name'));
    }

    findPlace(name) {
        return this.schedule.find(elem => elem.name === name);
    }

    changeName(oldName, newName) {
        let index = this.schedule.findIndex(elem => elem.name === oldName);
        this.schedule[index].name = newName;
    }

    markPlace(name, flag) {
        let index = this.schedule.findIndex(elem => elem.name === name);
        this.schedule[index].visited = flag;
    }

    delete(place) {
        this.schedule = this.schedule.filter(elem => elem.name !== place);
    }

    swapPlaces(name1, name2) {
        let index1 = this.schedule.findIndex(elem => elem.name === name1);
        let index2 = this.schedule.findIndex(elem => elem.name === name2);

        let temp = this.schedule[index1];
        this.schedule[index1] = this.schedule[index2];
        this.schedule[index1] = temp;
    }

    clear() {
        this.schedule = [];
    }
};
