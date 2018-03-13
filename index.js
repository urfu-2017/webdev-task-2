'use strict';

const path = require('path');

const express = require('express');
const dotenv = require('dotenv');

const routes = require('./routes');

const app = express();
const defaultValues = dotenv.config({ path: path.join(__dirname, '.env') }).parsed;

app.use((err, req, res, next) => {
    console.error(err.stack);

    next();
});

routes(app);

app.use((err, req, res) => {
    console.error(err.stack);

    res.sendStatus(500);
});

app.listen(process.env.PORT, () => {
    console.info(`Open http://localhost:${defaultValues.PORT}`);
});
