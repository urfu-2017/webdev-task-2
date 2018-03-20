'use strict';
const { error404, preFlightCorsOnAllDomains } = require('./controllers/errors');
const places = require('./routes/places');

module.exports = app => {

    app.use(preFlightCorsOnAllDomains);
    app.use('/api/v31337/places', places);


    app.all('*', error404);
};
