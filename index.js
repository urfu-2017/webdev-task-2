'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
routes(app);

app.listen(8080, () => {
    console.info('Open http://localhost:8080/');
});
