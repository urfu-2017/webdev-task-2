const {
  create, list, search, update, remove, move,
} = require('./controllers/records');
const express = require('express');

const apiRoutes = express.Router();

apiRoutes.get('/', (req, res) => {
  res.json({ message: 'welcome to the api' });
});

apiRoutes.route('/record')
  .get(list)
  .put(update)
  .delete(remove)
  .post(create);

apiRoutes.route('/record/move')
  .put(move);

apiRoutes.route('/search')
  .get(search);

module.exports = apiRoutes;
