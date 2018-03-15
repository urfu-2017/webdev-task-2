'use strict';
const path = require('path');

const express = require('express');
const hbs = require('hbs');
const app = express();

const help = require('./mocks/help');
const locations = require('./controllers/locations');
const createResponse = require('./controllers/createResponse');
// const LocationStorage = require('../models/LocationStorage');

const publicDir = path.join(__dirname, 'public');

const viewsDir = path.join(__dirname, 'views');
const partialsDir = path.join(viewsDir, 'partials');

app.set('view engine', 'hbs');
app.set('views', viewsDir);

app.use(express.static(publicDir));

app.options('/', (req, res) => {
    // will be using it as a help command
    res.send(help);
});

app.get('/', (req, res) => {
    // sortBy: timeCreated or name
    // findByDescr: string - to find entry by description
    // amount: amount of records on screen, page: number of page, both are int
    let result;
    if (req.query.findByDescr) {
        result = locations.getPlacesByDescr(req.query);
    } else {
        result = locations.getPlaces(req.query);
    }
    res = createResponse(res, result);
    res.send(result);
});

app.post('/', (req, res) => {
    const result = locations.createPlace(req.query);
    res = createResponse(res, result);
    res.send(result);
});

app.put('/', (req, res) => {
    // updates existing location
    // place: place, param: param, value: new value
    const result = locations.updatePlace(req.query);
    res = createResponse(res, result);
    res.send(result);
});

app.patch('/', (req, res) => {
    // place1: name of first place we want to swap, place2: name2
    const result = locations.swapPlaces(req.query);
    res = createResponse(res, result);
    res.send(result);
});

app.delete('/', (req, res) => {
    // place: place name or place: all - to delete every record
    const result = locations.deletePlace(req.query);
    res = createResponse(res, result);
    res.send(result);
});

hbs.registerPartials(partialsDir, () => {
    app.listen(8080, () => {
        console.info(`Server started on ${8080}`);
        console.info(`Open http://localhost:${8080}/`);
    });
});

module.exports = app;
