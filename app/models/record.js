const config = require('../config/localhost');

const storage = [];

const { recordsPerPage } = config;

class Record {
  constructor({
    place, description, isVisited, date,
  }) {
    this.place = place;
    this.description = description;
    this.isVisited = isVisited;

    if (date) {
      this.creationDate = date;
    } else {
      this.creationDate = new Date().toLocaleDateString('en-US');
    }
  }

  static getAllRecords() {
    return storage;
  }

  static getSortedRecords(sortType) {
    if (sortType === 'date') {
      return storage.concat().sort((a, b) => a.creationDate.localeCompare(b.creationDate));
    }

    if (sortType === 'alph' || sortType === 'alphabet') {
      return storage.concat().sort((a, b) => a.place.localeCompare(b.place));
    }
    return Record.getAllRecords();
  }

  static getPageRecords(page) {
    if ((page - 1) * recordsPerPage <= storage.length) {
      return storage.slice((page - 1) * recordsPerPage, page * recordsPerPage);
    }
    return storage.slice(
      (storage.length % recordsPerPage) * recordsPerPage,
      ((storage.length % recordsPerPage) + 1) * recordsPerPage,
    );
  }

  save() {
    storage.push(this);
  }
}

module.exports = Record;
