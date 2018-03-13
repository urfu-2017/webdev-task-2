'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');

const app = express();
app.use(bodyParser.json());

routes(app);

const port = 8080;
app.listen(port, () => {
    console.info(`Listening on http://localhost:${port}`);
});
