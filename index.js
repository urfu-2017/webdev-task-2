'use strict';

const express = require('express');
const dotenv = require('dotenv');

const routes = require('./routes');

const app = express();
const defaultValues = dotenv.config('./env').parsed;

app.use((err, req, res, next) => {
    console.error(err.stack);

    next();
});

routes(app);

app.listen(defaultValues.PORT, () => {
    console.info(`Open http://localhost:${defaultValues.PORT}`);
});
