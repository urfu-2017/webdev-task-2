'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');

const app = express();
app.use(bodyParser.json());

app.get('/places', routes.getPlaces);
app.post('/places', routes.postPlaces);
app.delete('/places', routes.deleteAll);
app.patch('/places/:id', routes.changeData);
app.delete('/places/:id', routes.deleteData);
app.get('/places/search', routes.getSearch);
app.get('*', (req, res) => {
    res.sendStatus(404);
});

app.listen(8080, () => {
    console.info('Listening on port 8080');
});
