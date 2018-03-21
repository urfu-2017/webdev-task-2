'use strict';

module.exports.getMongo = async function () {
    const MongoClient = require('mongodb').MongoClient;
    const db = require('./config/db');
    let mongo = await MongoClient.connect(db.url).then(async (client) => {
        let maxSite = await client.db('places').collection('places')
            .find()
            .sort({ site: -1 })
            .limit(1)
            .toArray()
            .then((items) => {
                let count = items.length === 0 ? 0 : items[0].site + 1;

                return count;
            })
            .catch((err) => console.error(err));

        return { client, maxSite };
    })
        .catch((err) => console.error(err));

    return mongo;
};
