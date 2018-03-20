'use strict';
const express = require('express');

const routes = require('./routes');

const app = express();
app.use(express.json());

routes(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.info(`Server started on ${PORT}`);
    console.info(`Open http://localhost:${PORT}/`);
});

module.exports = app;
