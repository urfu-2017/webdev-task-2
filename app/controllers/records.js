const Record = require('../models/record');

exports.create = (req, res) => {
  const record = new Record({ ...req.body, isVisited: false });
  record.save();

  res.redirect(200, '/api');
};

exports.list = (req, res) => {
  if (req.query.sort) {
    res.json(Record.getSorted(req.query.sort));
    return;
  }
  if (req.query.page) {
    res.json(Record.getPage(req.query.page));
    return;
  }
  res.json(Record.getAll());
};

exports.search = (req, res) => {
  res.json(Record.searchByDescription(req.query));
};

exports.update = (req, res) => {
  const { property, update } = req.body;
  const { id, move } = req.query;
  const json = { message: '' };
  if (id && property && update) {
    json.message = `${json.message + Record.updateProperty({ id, property, update })}; `;
  }
  if (id && move) {
    json.message = `${json.message + Record.move(id, move)}`;
  }
  if (!json.message) {
    json.message = 'Missing parameters';
  }
  res.json(json);
};

exports.remove = (req, res) => {
  if (req.query.all) {
    res.json({ message: Record.deleteAll() });
    return;
  }
  res.json({ message: Record.delete(req.body.id) });
};
