'use strict';

const express = require('express');

const app = express();

const controller = require('./controllers/locations');
const err404 = (req, res) => res.sendStatus(404);

app.use(express.json());

app.get('/places', controller.getLoc);
app.get('/places/search', controller.searchLoc);
app.delete('/places', controller.removeLoc);
app.patch('/places/swap', controller.swapLoc);
app.post('/places', controller.createLoc);
app.patch('/places', controller.editLoc);
app.all('*', err404);

app.listen(8080, () => {
    console.info('Server had started on http://localhost:8080');
});
