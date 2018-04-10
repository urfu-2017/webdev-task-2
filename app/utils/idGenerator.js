'use strict';

class IdGenerator {
    constructor() {
        this.id = 1;
    }

    get() {
        return this.id++;
    }
}

module.exports = new IdGenerator();
