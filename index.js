'use strict';

const express = require('express');
const cors = require('cors');

const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json({ strict: false }));
routes(app);

const port = 8081;
app.listen(port, () => {
    console.info(`Server started on http://localhost:${port}/`);
});
