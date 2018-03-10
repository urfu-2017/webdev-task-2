'use strict';

const express = require('express');

const routes = require('./routes');

const app = express();

app.use(express.json());
routes(app);

const port = 8080;
app.listen(port, () => {
    console.info(`Server started on http://localhost:${port}/`);
});
