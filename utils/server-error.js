'use strict';

module.exports = class extends Error {
    constructor(message, status = 404) {
        super(message);
        this.status = status;
    }
};
