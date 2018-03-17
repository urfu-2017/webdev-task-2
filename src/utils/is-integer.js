'use strict';

/* eslint-disable no-bitwise */

function isInteger(n) {
    return n >>> 0 === parseFloat(n);
}

module.exports = isInteger;
