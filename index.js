'use strict';
const path = require('path');

const express = require('express');
const hbs = require('hbs');
const app = express();

const help = require('./mocks/help');
const locations = require('./controllers/locations');
const formatData = require('./controllers/format-data');

const publicDir = path.join(__dirname, 'public');

const viewsDir = path.join(__dirname, 'views');
const partialsDir = path.join(viewsDir, 'partials');

app.set('view engine', 'hbs');
app.set('views', viewsDir);

app.use(express.static(publicDir));

app.options('/', (req, res) => {
    // will be using it as a help command
    console.info(req.method);
    console.info(req.query);
    res.send(help);
});

app.get('/', (req, res) => {
    // sortBy: timeCreated or name
    // findByDescr: string - to find entry by description
    // amount: amount of records on screen, page: number of page, both are int
    const query = req.query;
    let result;
    if (query.findByDescr) {
        result = locations.getPlacesByDescr(query);
    } else {
        result = locations.getPlaces(query);
    }
    res.statusCode = result.code;
    res.statusMessage = result.message;
    let array = formatData(result.body);
    if (query.amount) {
        const page = (query.page - 1) || 0;
        array = array.splice(page * query.amount, query.amount);
    }
    res.send('Get places  - ' + result.code + ' ' + result.message + '\n' +
        array.join('\n'));
});

app.post('/', (req, res) => {
    const query = req.query;
    const result = locations.createPlace(query);
    res.statusCode = result.code;
    res.statusMessage = result.message;
    res.send('Create ' + query.place + ' - ' + result.message);
});

app.put('/', (req, res) => {
    // updates existing location
    // place: place, param: param, value: new value
    const query = req.query;
    const result = locations.updatePlace(query);
    res.statusCode = result.code;
    res.statusMessage = result.message;
    res.send(query.place + ' new value: ' + query.value +
        ' - ' + result.code + ' ' + result.message);
});

app.patch('/', (req, res) => {
    // place1: name of first place we want to swap, place2: name2
    const query = req.query;
    const result = locations.swapPlaces(query);
    res.statusCode = result.code;
    res.statusMessage = result.message;
    res.send(query.place1 + ' and ' + query.place2 + ' - ' + result.code + ' ' + result.message);
});

app.delete('/', (req, res) => {
    // place: place name or place: all - to delete every record
    const query = req.query;
    const result = locations.deletePlace(query);
    res.statusCode = result.code;
    res.statusMessage = result.message;
    res.send(query.place + ' - ' + result.code + ' ' + result.message);
});

hbs.registerPartials(partialsDir, () => {
    app.listen(8080, () => {
        console.info(`Server started on ${8080}`);
        console.info(`Open http://localhost:${8080}/`);
    });
});

module.exports = app;
