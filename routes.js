'use strict';
const { error404 } = require('./controllers/errors');
const places = require('./routes/places');

module.exports = app => {

    app.use('/api/v31337/places', places);


    app.all('*', error404);
};
