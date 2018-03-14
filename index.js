const express = require('express');
const bodyParser = require('body-parser');

const { apiRoutes, otherRoutes } = require('./app/routes');
const errorHandler = require('./app/middlewares/handle-errors');
const config = require('./app/config/localhost');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(errorHandler);

app.use('/api', apiRoutes);

otherRoutes(app);

const { port } = config;

app.listen(port, () => {
  console.info(`Server started on ${port}`);
  console.info(`Open http://localhost:${port}/`);
});

module.exports = app;
