'use strict';

let places = [];

class Place {
    constructor({ name, description }) {
        this.id = Math.round((Date.now() * Math.random() * Math.pow(10, 5))) %
            Math.round(Math.random() * Math.pow(10, 16));
        this.name = name;
        this.description = description;
        this.isVisited = false;
        const tempDate = new Date();
        const month = ('0' + (tempDate.getMonth() + 1)).substr(-3);
        this.created = [tempDate.getDate(), month, tempDate.getFullYear()].join('.');
        this.unixTimeStamp = Date.now();
    }

    static clearAll() {
        places = [];

        return places;
    }

    create() {
        places.push(this);
    }

    static deletePlace(id) {
        const index = places.findIndex(place => place.id === Number(id));
        if (index !== -1) {
            places.splice(index, 1);

            return true;
        }

        return false;
    }

    static edit(id, name, description) {
        const index = places.findIndex(place => place.id === Number(id));
        if (index !== -1) {
            places[index].name = name;
            places[index].description = description;

            return {
                placeWithNewValue: places[index],
                isEdit: true
            };
        }

        return { isEdit: true };
    }

    static findPlace(value, searchType) {
        value = value.toLowerCase();
        if (searchType === 'nameOnly') {
            return places.filter(place => (place.name.toLowerCase().indexOf(value) + 1));
        } else if (searchType === 'descrOnly') {
            return places.filter(place => (place.description.toLowerCase().indexOf(value) + 1));
        }

        return places.filter(place => {
            const inDescription = Boolean(place.description.toLowerCase().indexOf(value) + 1);
            const inName = Boolean(place.name.toLowerCase().indexOf(value) + 1);

            return inDescription || inName;
        });
    }

    static list(sortType) {
        if (sortType === 'date') {
            return places.sort((a, b) => a.unixTimeStamp > b.unixTimeStamp);
        } else if (sortType === 'name') {
            return places.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase());
        }


        return places;

    }

    static pagination(numberForPages) {
        numberForPages = Number(numberForPages);
        let counter = 0;
        let arrPages = [];
        while (counter < places.length) {
            arrPages.push(places.slice(counter, counter + numberForPages));
            counter += numberForPages;
        }

        return arrPages;
    }

    static recountArray(index1, index2) {
        return places.map((place, index) => {
            if (index === index2 - 1) {
                return places[index1];
            }
            if (index >= index2) {
                return place;
            }
            if (index >= index1) {
                return places[index + 1];
            }

            return place;
        });
    }

    static swap(id1, id2) {
        let index1 = places.findIndex(place => place.id === Number(id1));
        let index2 = places.findIndex(place => place.id === Number(id2));
        if ((index1 === undefined) || (index2 === undefined)) {
            return places;
        }
        if (index1 > index2) {
            places.reverse();
            index1 = places.length - index1 - 1;
            index2 = places.length - index2 - 1;
            places = this.recountArray(index1, index2);
            places.reverse();
        } else if (index1 < index2) {
            places = this.recountArray(index1, index2);
        }

        return places;
    }

    static visit(id, isVisit) {
        const index = places.findIndex(place => place.id === Number(id));
        if (index + 1) {
            places[index].isVisited = isVisit;

            return true;
        }

        return false;
    }
}

module.exports = Place;
