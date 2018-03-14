'use strict';

const bodyParser = require('body-parser');
const config = require('config');
const express = require('express');
const morgan = require('morgan');

const routes = require('./routes');

const app = express();

if (config.get('debug')) {
    app.use(morgan('dev'));
}

app.use(bodyParser.json());

app.use((err, req, res, next) => {
    console.error(err.stack);

    next();
});

app.use((req, res, next) => {
    res.locals.meta = {
        charset: 'utf-8',
        description: 'rest'
    };

    res.locals.title = 'rest';

    next();
});

routes(app);

app.use((err, req, res) => {
    console.error(err.stack);

    res.sendStatus(500);
});

app.listen(8080, () => {
    console.info('Open on http://localhost:8080/');
});
