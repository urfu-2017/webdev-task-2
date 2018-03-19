import { _ } from 'lodash';
let places = [];

class Place {
    constructor({ name, description }) {
        this.name = name;
        this.description = description;
        this.visitedPlace = false;
        this.createTime = new Date();
    }

    save() {
        places.push(this);
    }

    static findAll() {
        return places;
    }

    static sortByDate() {
        return places.sort((a, b) => a.createTime > b.createTime);
    }

    static sortByAbc() {
        return places.sort((a, b) => a.name > b.name);
    }

    static find(description) {
        return places.filter(place => place.description === description);
    }

    static findByName(name) {
        return places.find(place => place.name === name);
    }

    static changeDescription(name, newDescription) {
        const place = this.findByName(name);
        place.description = newDescription;

        return place;
    }

    static isVisited(name) {
        const placeToTick = this.findByName(name);
        if (placeToTick) {
            placeToTick.visitedPlace = true;
        }

        return placeToTick.visitedPlace;

    }

    static deleteAll() {
        places = [];
    }

    static isPlaceDeleted(name) {
        const len = places.length;
        places = places.filter(place => place.name !== name);

        return places.length === len;
    }

    static switchOrder(name1, name2) {
        const firstPlaceToSwap = _.findIndex(places, obj => obj.name === name1);
        const secondPlaceToSwap = _.findIndex(places, obj => obj.name === name2);
        if (firstPlaceToSwap >= 0 && secondPlaceToSwap >= 0) {
            let temp = places[firstPlaceToSwap];
            places[firstPlaceToSwap] = places[secondPlaceToSwap];
            places[secondPlaceToSwap] = temp;

            return places;
        }

        return [];
    }

    static onNewPage() {
        let pages = [];
        places = _.chunk(places, 2);
        places.forEach(element => {
            pages.push(element);
        });

        return pages;
    }

}

module.exports = Place;
