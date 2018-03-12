'use strict';

const { getPlaces, getPage, createPlace, deletePlaces, updatePlace, shuffle } =
    require('./controllers/placeController');

module.exports = app => {
    app.get('/places', getPlaces);
    app.get('/places/pages/:pageNumber([0-9]+)', getPage);

    app.post('/places', createPlace);
    app.delete('/places', deletePlaces);

    app.patch('/places/place/:id([0-9]+)', updatePlace);
    app.patch('/places/shuffle/', shuffle);
};

