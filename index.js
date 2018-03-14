'use strict';
const express = require('express');

const routes = require('./routes');

const app = express();

routes(app);

app.listen(8080, () => {
    console.info('Open http://localhost:8080/');
});
