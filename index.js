'use strict';

const express = require('express');

const app = express();

const controller = require('./controllers/locations');
const err404 = (req, res) => res.sendStatus(404);

app.use(express.json());

app.get('/', controller.getLoc);
app.get('/search', controller.searchLoc);
app.delete('/', controller.removeLoc);
app.patch('/swap', controller.swapLoc);
app.post('/', controller.createLoc);
app.patch('/', controller.editLoc);
app.all('*', err404);

app.listen(8080);
