'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./config.json');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(bodyParser.json());

require('./routes')(app);
app.use(errorHandler);


const port = config.port;
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Сервис работает на ${port} порту`));

module.exports = app;
