'use strict';
require('dotenv').config();

const express = require('express');

const routes = require('./routes');
const app = express();

app.use(express.json());

routes(app);

app.listen(process.env.PORT, () => {
    console.info(`http://localhost:${process.env.PORT}`);
});
