'use strict'

const express = require('express');
const route = require('./routes');
const Place = require('./models/place');
const placesStore = require('./models/placesStore');

const app = express();

app.use(express.json());

route(app);

for (let i = 0; i < 10; i++) {
    let place = new Place('Hello' + i, 'World' + i);
    placesStore.add(place);
}

app.listen(8000, () => {
    console.info('Server had started on http://localhost:8000');
});
