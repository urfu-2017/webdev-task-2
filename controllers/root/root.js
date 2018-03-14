'use strict';

const Controller = require('../../utils/controller');

module.exports = class extends Controller {
    get() {
        this.end('root');
    }
};
