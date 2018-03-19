'use strict';
const path = require('path');

const express = require('express');
const hbs = require('hbs');
const app = express();

const help = require('./mocks/help');
const locationController = require('./controllers/locationController');

const publicDir = path.join(__dirname, 'public');

const viewsDir = path.join(__dirname, 'views');
const partialsDir = path.join(viewsDir, 'partials');

app.set('view engine', 'hbs');
app.set('views', viewsDir);

app.use(express.static(publicDir));

const getControllerInstance = (Controller, methodName) => (req, res, next) => {
    try {
        const controller = new Controller(req, res);
        controller[methodName]();
    } catch (e) {
        next(e);
    }
};

app
    .options('/', (req, res) => {
        // will be using it as a help command
        res.send(help);
    })
    .get('/', getControllerInstance(locationController, 'get'))
    // sortBy: timeCreated or name
    // findByDescr: string - to find entry by description
    // amount: amount of records on screen, page: number of page, both are int
    .post('/', getControllerInstance(locationController, 'createPlace'))
    .put('/', getControllerInstance(locationController, 'updatePlace'))
    // updates existing location
    // place: place, param: param, value: new value
    // .put('/', getControllerInstance(locationController, 'swapPlaces'))
    // place1: name of first place we want to swap, place2: name2
    .delete('/', getControllerInstance(locationController, 'deletePlace'))
    // place: place name or place: all - to delete every record
    .use('*', (req, res) => {
        res.status(404);
        res.end();
    });

hbs.registerPartials(partialsDir, () => {
    app.listen(8080, () => {
        console.info(`Server started on ${8080}`);
        console.info(`Open http://localhost:${8080}/`);
    });
});

module.exports = app;
