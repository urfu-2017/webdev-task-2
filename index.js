'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes');
const user = require('./middlewares/user');

const app = express();

app.use(bodyParser.json());
app.use(user);
router(app);

app.listen(8000);
