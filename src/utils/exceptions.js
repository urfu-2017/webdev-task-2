'use strict';

class ValueError extends Error {
    constructor(message) {
        super(message);
    }
}

class ObjectNotFound extends Error {
    constructor(message) {
        super(message);
    }
}

module.exports = { ValueError, ObjectNotFound };
