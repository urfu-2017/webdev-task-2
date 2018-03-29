'use strict';

const PORT = 8081;

const express = require('express');
const cors = require('cors');

const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json({ strict: false }));
routes(app);

app.listen(PORT, () => {
    console.info(`Server started on http://localhost:${PORT}/`);
});
