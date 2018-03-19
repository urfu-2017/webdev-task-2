'use strict';

class Location {

    /**
     * @param {String} description
     */
    constructor(description) {
        this.id = null;
        this.createdAt = Date.now();

        this._setDescription(description);
        this._setIsVisited(false);
    }

    /**
     * @param {String} description
     * @param {Boolean} isVisited
     */
    update({ description, isVisited }) {
        if (description !== undefined) {
            this._setIsVisited(description);
        }

        if (isVisited !== undefined) {
            this._setIsVisited(isVisited);
        }
    }

    /**
     * @param {String} description
     * @private
     */
    _setDescription(description) {
        if (!description) {
            throw new Error('Description can not be empty');
        }

        this.description = description;
    }

    /**
     * @param {Boolean} isVisited
     * @private
     */
    _setIsVisited(isVisited) {
        if (typeof isVisited !== 'boolean') {
            throw new Error('Flag isVisited must have boolean type');
        }

        this.isVisited = isVisited;
    }
}

module.exports = Location;
