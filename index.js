const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const apiRoutes = require('./app/routes');
const errorHandler = require('./app/middlewares/handle-errors');
const { error404 } = require('./app/controllers/errors');
const accessLog = require('./app/middlewares/access-log');
const config = require('./config');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(errorHandler);
app.use(cors());

if (config.debug === true) {
  app.use(accessLog);
}

app.use('/api', apiRoutes);
app.all('*', error404);

const { port } = config;

app.listen(port, () => {
  console.info(`Server started on ${port}`);
  console.info(`Open http://localhost:${port}/`);
});

module.exports = app;
