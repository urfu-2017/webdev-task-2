'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');
const Note = require('./noteModel');
const notes = require('./notes');

// при старте заполняю заметки из json
for (const note of notes) {
    new Note(note).save();
}

const app = express();

// разбираю тело POST-запроса
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

routes(app);

const port = 8080;

app.listen(port, () => {
    console.info(`Server started on ${port}`);
    console.info(`Open http://localhost:${port}`);
});
