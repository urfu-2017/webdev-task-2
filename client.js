'use strict';

const requestPromise = require('request-promise');

var options = {
    uri: 'http://localhost:8080/',
    method: 'GET',
    json: { desc: 'dd', isVisited: true, id: '0', page: '0', itemsCount: '5', sort: 'alphabet' }
};

requestPromise(options)
    .then(message => console.info(message));
