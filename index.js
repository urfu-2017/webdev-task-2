'use strict';

const express = require('express');
const route = require('./routes');

const app = express();

app.use(express.json());

route(app);

app.listen(8000, () => {
    console.info('Server had started on http://localhost:8000');
});
