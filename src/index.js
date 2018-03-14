'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config');
const messages = require('./assets/messages');
const placesRouter = require('./routers/places');
const { NotFound } = require('./utils/http-exceptions');
const { gracefulShutdown } = require('./utils/app-helpers');
const { genericErrorHandler } = require('./middlewares/error-handlers');

const app = express();
app.use(bodyParser.json());
app.use('/places', placesRouter);
app.all('*', () => {
    throw new NotFound(messages.endpointNotFound);
});
app.use(genericErrorHandler);

const server = app.listen(config.serverPort, config.serverHost, () => {
    const { address, port } = server.address();
    console.info(`Сервер запущен по адресу http://${address}:${port}`);
});

process.once('SIGINT', async () => gracefulShutdown(server));
process.once('SIGTERM', async () => gracefulShutdown(server));
process.once('SIGUSR2', async () => gracefulShutdown(server));

module.exports = app;
