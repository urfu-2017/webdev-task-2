const storage = [];

const { recordsPerPage, accessibleProperties } = require('../../config');

class Record {
  constructor({
    place, description, isVisited, date,
  }) {
    this.place = place;
    this.description = description;
    this.isVisited = isVisited;
    this.id = storage.length;

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

  static searchByDescription({ substring }) {
    return storage.filter(record => record.description.indexOf(substring) !== -1);
  }

  static updateProperty({ id, property, update }) {
    if (!(id <= storage.length && storage.length)) {
      return `Record ${id} doesn't exist`;
    }
    // eslint-disable-next-line no-prototype-builtins
    if (!storage[id].hasOwnProperty(property)) {
      return `Record's ${id} property '${property}' doesn't exist`;
    }
    if (!(accessibleProperties.includes(property))) {
      return `Record's ${id} property '${property}' is not accessible`;
    }

    if (property === 'isVisited') {
      storage[id][property] = update === 'true';
    } else {
      storage[id][property] = update;
    }
    return `property '${property}' update successful`;
  }

  save() {
    storage.push(this);
  }
}

module.exports = Record;
