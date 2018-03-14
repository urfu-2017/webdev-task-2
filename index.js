'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const routes = require('./routes');

const port = 8080;

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

module.exports = app;
routes(app);

app.listen(port, () => {
    console.info(`server is running: http://localhost:${port}/`);
});
