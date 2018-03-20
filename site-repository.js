'use strict';

const Site = require('./models/site');

const sortByProperty = (property, order = 'asc') => {
    return (a, b) => {
        if (a[property] === b[property]) {
            return 0;
        }

        const orderFactor = order === 'asc' ? 1 : -1;
        const comparisonResult = a[property] > b[property] ? 1 : -1;

        return comparisonResult * orderFactor;
    };
};

module.exports = class SiteRepository {
    constructor() {
        this._sites = [];
        this._currentId = 1;
    }

    contains(id) {
        return this._sites.find(site => site.id === id);
    }

    getById(id) {
        const result = this._sites.find(site => site.id === id);
        if (!result) {
            throw new Error('Site with specified id not found');
        }

        return result;
    }

    get({ sortBy, order, limit, page }) {
        let result = !sortBy
            ? this._sites
            : this._sites
                .slice()
                .sort(sortByProperty(sortBy, order));


        return limit ? result.slice(limit * (page - 1), limit * page) : result;
    }

    add(siteObject) {
        const id = this._currentId++;
        siteObject.id = id;
        const site = new Site(siteObject);
        this._sites.push(site);

        return site;
    }

    findByDescription(description) {
        return this._sites
            .filter(site => site.description.includes(description.toLowerCase()));
    }

    update(id, newSite) {
        const index = this._sites.findIndex(s => s.id === id);
        if (index === -1) {
            throw new Error('Site with specified id not found');
        }

        this._sites[index] = newSite;

        return newSite;
    }

    swap(id1, id2) {
        const idx1 = this._sites.findIndex(site => site.id === id1);
        const idx2 = this._sites.findIndex(site => site.id === id2);

        if (idx1 === -1 || idx2 === -1) {
            throw new Error('Site with specified id not found');
        }

        const temp = this._sites[idx1];
        this._sites[idx1] = this._sites[idx2];
        this._sites[idx2] = temp;
    }

    delete(id) {
        this._sites = this._sites.filter(site => site.id !== id);
    }

    clear() {
        this._sites = [];
    }
};
