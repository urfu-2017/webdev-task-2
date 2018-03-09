'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config');
const locationController = require('./controllers/location');

const baseUrl = `/api/v${config.apiVersion}/`;
const app = express();
app.use(bodyParser.json());

app.get(baseUrl + 'locations', locationController.index);
app.post(baseUrl + 'locations', locationController.add);
app.patch(baseUrl + 'locations/:id', locationController.update);
app.put(baseUrl + 'locations/:id/order/:position', locationController.changeOrder);
app.delete(baseUrl + 'locations/:id', locationController.remove);
app.delete(baseUrl + 'locations', locationController.reset);
app.all('*', (req, res) => res.sendStatus(404));

app.use((err, req, res, next) => {
    /* eslint no-unused-vars: 0 */
    console.error(err.stack);
    res.status(400).json({ error: err.message });
});

app.listen(config.port);
