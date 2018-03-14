const Record = require('../models/record');

exports.create = (req, res) => {
  console.log(req.body);
  const record = new Record({ ...req.body, isVisited: false });
  console.log(record);
  record.save();

  res.redirect(302, '/record');
};
