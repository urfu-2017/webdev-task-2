const Record = require('../models/record');

exports.create = (req, res) => {
  console.log(req.body);
  const record = new Record({ ...req.body, isVisited: false });
  console.log(record);
  record.save();

  res.redirect(200, '/api');
};

exports.list = (req, res) => {
  if (req.query.sort) {
    res.json(Record.getSortedRecords(req.query.sort));
    return;
  }
  if (req.query.page) {
    res.json(Record.getPageRecords(req.query.page));
    return;
  }
  res.json(Record.getAllRecords());
};

exports.search = (req, res) => {
  res.json(Record.searchByDescription(req.query));
};

exports.update = (req, res) => {
  const { id, property, update } = req.body;
  const json = { message: 'Missing parameters' };
  if (id && property && update) {
    json.message = Record.updateProperty({ id, property, update });
  }
  res.json(json);
};
