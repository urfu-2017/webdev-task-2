const { error404 } = require('./controllers/errors');
const express = require('express');

const apiRoutes = express.Router();

apiRoutes.use((req, res, next) => {
  console.log('Time: ', Date.now());
  console.log('Req: ', req.method);
  next();
});

apiRoutes.get('/', (req, res) => {
  res.json({ message: 'welcome to the api' });
});

const otherRoutes = (app) => {
  app.all('*', error404);
};

module.exports = { apiRoutes, otherRoutes };
