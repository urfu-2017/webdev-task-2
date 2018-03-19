'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./config');
const apiVersionOne = require('./controllers/v1');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/v1', apiVersionOne);
app.all('*', (req, res) => res.sendStatus(404));

app.use((err, req, res, next) => {
    /* eslint no-unused-vars: 0 */
    console.error(err.stack);
    res.status(400).json({ error: err.message });
});

app.listen(config.port, () => {
    console.info(`Server started. Open http://localhost:${config.port}`);
});
