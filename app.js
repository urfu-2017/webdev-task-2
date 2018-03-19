'use strict';

import bodyParser from 'body-parser';
import morgan from 'morgan';
import express from 'express';

import routes from './routes';

const app = express();

app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
routes(app);
app.listen(8080);


module.exports = app;
