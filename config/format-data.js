'use strict';

module.exports = function formatArray(arr) {
    if (!arr || !arr.length) {
        return [];
    }

    return arr.map(elem => 'name: ' + elem.name + ', description: ' + (elem.description || 'none') +
        ', visited: ' + elem.visited);
};
