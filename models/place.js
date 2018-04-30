'use strict';

let places = [];

class Place {
    constructor({ description }) {
        this.description = description;
        this.visited = false;
        this.created = new Date();
        this.id = places.length;
    }

    save() {
        places.push(this);
    }

    static find(id, description) {
        let founded = [];

        if (!isNaN(id)) {
            founded.push(places.find(place => place.id === Number(id)));

            return founded;
        }

        if (description !== undefined) {
            founded.push(places.find(place => place.description === description));

            return founded;
        }

        return places;
    }

    static removePlace(id) {
        if (id !== undefined) {
            places.splice(places[id], 1);
        }
    }

    static edit(id, newDescription, isVisited) {
        if (id > places.length - 1) {

            return [];
        }
        let foundedPlace = Place.find(id, undefined)[0];
        if (newDescription) {
            foundedPlace.description = newDescription;
        }
        if (isVisited !== undefined) {
            foundedPlace.visited = isVisited;
        }

        return [foundedPlace];
    }

    static findAll() {
        return places;
    }

    static clearAll() {
        places = [];
    }

    static changeIndex(id, to) {
        const placeFrom = Place.find(id, undefined)[0];
        const placeTo = places[to];
        const from = places.indexOf(placeFrom);
        places.splice(to, 1, placeFrom);
        places.splice(from, 1, placeTo);
    }

    static paginate(sortedPlaces, size, pageNumber) {
        if (pageNumber) {
            let pages = [];
            if (pageNumber > sortedPlaces.length / size) {
                return [];
            }
            for (let i = 0; i < sortedPlaces.length; i += size) {
                let page = sortedPlaces.slice(i, i + size);
                pages.push(page);
            }

            return pages[pageNumber - 1];
        }

        return sortedPlaces;
    }

    static sortPlaces(foundedPlaces, sortByDate, sortByABC) {
        if (sortByDate === 'asc') {
            foundedPlaces.sort((a, b) => a.created - b.created);
        }
        if (sortByDate === 'desc') {
            foundedPlaces.sort((a, b) => b.created - a.created);
        }
        if (sortByABC) {
            foundedPlaces.sort((a, b) => a.description.localeCompare(b.description));
        }

        return foundedPlaces;
    }
}

module.exports = Place;
