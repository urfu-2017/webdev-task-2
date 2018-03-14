'use strict';

require('dotenv').config();

const bodyParser = require('body-parser');
const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');

const app = express();
const router = new express.Router();

const HOSTNAME = process.env.HOSTNAME;
const PORT = process.env.PORT;
const HOST = `${HOSTNAME}:${PORT}`;

require('./routes')(router);
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());
app.use(`/api/v${process.env.API_VERSION}`, router);

const swaggerDefinition = {
    info: {
        title: 'Site Service API',
        version: `${process.env.API_VERSION}`,
        description: 'API that could be used to retrieve and update sites'
    },
    host: HOST,
    basePath: '/'
};

// options for the swagger docs
const options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./routes.js']
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);
app.get('/swagger.json', (req, res) => res.json(swaggerSpec));


app.listen(PORT, HOSTNAME, () => console.info(`Started on ${HOST}`));
