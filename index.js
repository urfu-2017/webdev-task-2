'use strict';

const bodyParser = require('body-parser');
const express = require('express');

const routes = require('./routes');

const app = express();

app.use(bodyParser.json());

app.use((err, req, res, next) => {
    console.error(err.stack);

    next();
});

routes(app);

app.listen(8080, () => {
    console.info('Open http://localhost:8080');
});
