'use strict';

const config = require('../config'); // здесь должны лежать константы и настройки
const MongoClient = require('mongodb').MongoClient;
const mongouri = config.mongouri;
console.info(config.mongouri);


module.exports = () => {
    return MongoClient.connect(mongouri);
};
