import { _ } from 'lodash';
let places = [];

class Place {
    constructor({ description }) {
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
        return places.sort((a, b) => a.description > b.description);
    }

    static find(description) {
        return places.find(place => place.description === description);
    }

    static changeDescription(description, newDescription) {
        const findToChange = this.find(description);
        if (findToChange) {
            findToChange.description = newDescription;

            return true;
        }

        return false;
    }

    static isVisited(description) {
        const placeToTick = this.find(description);
        if (placeToTick) {
            placeToTick.visitedPlace = true;

            return true;
        }

        return false;

    }

    static deleteAll() {
        places = [];
    }

    static deletePlace(description) {
        const index = this.find(description);
        if (index) {
            places.splice(index, 1);

            return true;
        }

        return false;
    }

    static changeIndex(index1, index2) {
        let temp = places[index1];
        places[index1] = places[index2];
        places[index2] = temp;
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
