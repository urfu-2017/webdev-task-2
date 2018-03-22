'use strict';

let places = [];

class Place {
    constructor({ name, description }) {

        this.name = name;
        this.description = description;
        this.isVisited = false;
        this.created = Date.now();
    }

    static clearAll(listName = places) {
        listName.length = 0;

        return listName;
    }

    create(listName = places) {
        listName.push(this);

        return listName;
    }

    static deletePlace(name, listName = places) {
        const index = this.findIndex(name);
        if (listName.splice(index, 1)) {
            return listName;
        }

        return listName;
    }

    static edit(body, listName = places) {
        const index = this.findIndex(body.name);
        listName[index].name = body.newName;

        return listName;
    }

    static findPlace({ value, searchType }, listName = places) {
        if (searchType === 'nameOnly') {
            return listName.filter(place => (place.name.indexOf(value) + 1));
        } else if (searchType === 'descrOnly') {
            return listName.filter(place => (place.description.indexOf(value) + 1));
        }

        return listName.filter(place => {
            const inDescription = Boolean(place.description.indexOf(value) + 1);
            const inName = Boolean(place.name.indexOf(value) + 1);

            return inDescription || inName;
        });
    }

    static list(sortType, listName = places) {
        if (sortType === 'date') {
            return listName.sort((a, b) => a.created > b.created);
        } else if (sortType === 'name') {
            return listName.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase());
        }

        return listName;

    }

    static swap(name, isTop, listName = places) {
        const index = this.findIndex(name);
        const tempPlace = listName[index];
        if (isTop && index - 1 !== 0) {
            listName[index] = listName[index - 1];
            listName[index - 1] = tempPlace;
        } else {
            listName[index] = listName[index + 1];
            listName[index + 1] = tempPlace;
        }

        return listName;
    }

    static visit({ name, isVisit }, listName = places) {
        isVisit = undefined || true;
        const index = this.findIndex(name);
        listName[index].isVisited = isVisit;

        return listName;
    }

    static findIndex(name, listName = places) {
        let resultIndex = listName.length;
        listName.forEach((place, index) => {
            if (place.name === name) {
                resultIndex = index;
            }
        });

        return resultIndex;
    }
}

module.exports = Place;
