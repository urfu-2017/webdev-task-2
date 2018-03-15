'use strict';

const requestPromise = require('request-promise');

var options = {
    uri: 'http://localhost:8080/places',
    method: 'PUT',
    json: { desc: 'bb', isVisited: true, id: '0' }
};

requestPromise(options)
    .then(message => console.info(message));
