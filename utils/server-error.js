'use strict';

const status = require('statuses');
const { ERRORS } = require('../data.json');

module.exports = class extends Error {
    getStatus() {
        switch (this.message) {
            case ERRORS.ID_NOT_CREATED:
                return status('UNPROCESSABLE ENTITY');
            case ERRORS.DESCRIPTION_NOT_STRING:
            case ERRORS.NO_DESCRIPTION:
                return status('BAD REQUEST');
            default:
                return status('NOT FOUND');
        }
    }
};
