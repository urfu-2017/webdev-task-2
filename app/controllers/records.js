const Record = require('../models/record');

exports.create = (req, res) => {
  const record = new Record({ ...req.body });
  record.save();

  res.send(record.toJSON());
};

exports.list = (req, res) => {
  if (req.query.sort) {
    res.send(Record.getSorted(req.query));
  }
  if (req.query.page) {
    res.send(Record.getPage(req.query.page));
  }
  if (!res.headersSent) {
    res.send(Record.getAll());
  }
};

exports.search = (req, res) => {
  if (!req.query.substring) {
    res.sendStatus(400);
  }
  res.send(Record.searchByDescription(req.query.substring).toJSON());
};

exports.update = (req, res) => {
  const id = req.query.id;
  const update = req.body;
  if (!(id && update)) {
    res.sendStatus(400);
    return;
  }
  const updated = Record.update(id, update);
  if (!updated) {
    res.sendStatus(404);
    return;
  }
  if (updated.error) {
    res.sendStatus(400).send(updated.error);
  } else {
    res.send(updated);
  }
};

exports.move = (req, res) => {
  if (!req.query) {
    res.sendStatus(400);
    return;
  }
  if (Record.move(req.query)) {
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
};

exports.remove = (req, res) => {
  if (req.query.all) {
    Record.deleteAll();
    res.sendStatus(200);
    return;
  }
  if (!req.body.id) {
    res.sendStatus(400);
    return;
  }
  if (Record.delete(req.body.id)) {
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
};
