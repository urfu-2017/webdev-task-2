const { error404 } = require('./controllers/errors');
const { create} = require('./controllers/records');
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

apiRoutes.route('/record')
  .post(create);

const otherRoutes = (app) => {
  app.all('*', error404);
};

module.exports = { apiRoutes, otherRoutes };
